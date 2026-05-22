package br.gov.serra.arca.modules.requests;

import br.gov.serra.arca.modules.animals.Animal;
import br.gov.serra.arca.modules.animals.AnimalRepository;
import br.gov.serra.arca.modules.requests.dto.AnimalInputDTO;
import br.gov.serra.arca.modules.requests.dto.CreateRequestDTO;
import br.gov.serra.arca.modules.requests.dto.TutorInputDTO;
import br.gov.serra.arca.modules.requests.dto.UpdateStatusDTO;
import br.gov.serra.arca.modules.tutors.RequesterType;
import br.gov.serra.arca.modules.tutors.Tutor;
import br.gov.serra.arca.modules.tutors.TutorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository requestRepository;
    private final RequestHistoryRepository historyRepository;
    private final TutorRepository tutorRepository;
    private final AnimalRepository animalRepository;

    public ServiceRequestService(
            ServiceRequestRepository requestRepository,
            RequestHistoryRepository historyRepository,
            TutorRepository tutorRepository,
            AnimalRepository animalRepository) {
        this.requestRepository = requestRepository;
        this.historyRepository = historyRepository;
        this.tutorRepository = tutorRepository;
        this.animalRepository = animalRepository;
    }

    @Transactional
    public ServiceRequest create(CreateRequestDTO dto) {
        Tutor tutor = tutorRepository.findByCpf(dto.tutor().cpf())
                .orElseGet(Tutor::new);
        applyTutorData(tutor, dto.tutor());
        tutor = tutorRepository.save(tutor);

        Animal animal = null;
        if (dto.animal() != null) {
            animal = new Animal();
            applyAnimalData(animal, dto.animal());
            animal = animalRepository.save(animal);
        }

        int score = calculatePriorityScore(dto.tutor(), dto.animal());

        ServiceRequest request = new ServiceRequest();
        request.setProtocol(generateProtocol());
        request.setType(dto.type());
        request.setService(dto.service());
        request.setStatus(RequestStatus.RECEBIDO);
        request.setPriorityScore(score);
        request.setPriorityLabel(calculatePriorityLabel(score));
        request.setNotes(dto.notes());
        request.setTutor(tutor);
        request.setAnimal(animal);
        request = requestRepository.save(request);

        RequestHistory history = new RequestHistory();
        history.setRequest(request);
        history.setStatus(RequestStatus.RECEBIDO);
        history.setNote("Solicitação recebida.");
        historyRepository.save(history);

        return request;
    }

    @Transactional(readOnly = true)
    public List<ServiceRequest> findAll() {
        return requestRepository.findAll();
    }

    @Transactional(readOnly = true)
    public ServiceRequest findByProtocol(String protocol) {
        return requestRepository.findByProtocol(protocol)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitação não encontrada"));
    }

    @Transactional
    public ServiceRequest updateStatus(UUID id, UpdateStatusDTO dto) {
        ServiceRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitação não encontrada"));

        request.setStatus(dto.status());
        request = requestRepository.save(request);

        RequestHistory history = new RequestHistory();
        history.setRequest(request);
        history.setStatus(dto.status());
        history.setNote(dto.note());
        historyRepository.save(history);

        return request;
    }

    private void applyTutorData(Tutor tutor, TutorInputDTO dto) {
        tutor.setName(dto.name());
        tutor.setCpf(dto.cpf());
        tutor.setEmail(dto.email());
        tutor.setPhone(dto.phone());
        tutor.setCep(dto.cep());
        tutor.setBairro(dto.bairro());
        tutor.setAddress(dto.address());
        tutor.setRequesterType(dto.requesterType());
        tutor.setVulnerableArea(dto.vulnerableArea());
    }

    private void applyAnimalData(Animal animal, AnimalInputDTO dto) {
        animal.setName(dto.name());
        animal.setSpecies(dto.species());
        animal.setSex(dto.sex());
        animal.setQuantity(dto.quantity());
        animal.setVaccinated(dto.vaccinated());
        animal.setRiskSituation(dto.riskSituation());
    }

    private int calculatePriorityScore(TutorInputDTO tutor, AnimalInputDTO animal) {
        int score = 0;
        if (tutor.requesterType() == RequesterType.CADUNICO) score += 3;
        if (tutor.requesterType() == RequesterType.ONG) score += 3;
        if (tutor.requesterType() == RequesterType.PROTETOR) score += 2;
        if (tutor.vulnerableArea()) score += 1;
        if (animal != null) {
            if (animal.quantity() >= 3) score += 2;
            if (animal.riskSituation()) score += 2;
        }
        return score;
    }

    private String calculatePriorityLabel(int score) {
        if (score >= 5) return "Alta";
        if (score >= 3) return "Média";
        return "Baixa";
    }

    private String generateProtocol() {
        String date = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        String random = UUID.randomUUID().toString().replace("-", "").substring(0, 6).toUpperCase();
        return "ARCA-" + date + "-" + random;
    }
}
