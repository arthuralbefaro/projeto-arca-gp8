package br.gov.serra.arca.modules.requests;

import br.gov.serra.arca.modules.requests.dto.CreateRequestDTO;
import br.gov.serra.arca.modules.requests.dto.UpdateStatusDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {

    private final ServiceRequestService service;

    public ServiceRequestController(ServiceRequestService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceRequest create(@Valid @RequestBody CreateRequestDTO dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<ServiceRequest> findAll() {
        return service.findAll();
    }

    @GetMapping("/{protocol}")
    public ServiceRequest findByProtocol(@PathVariable String protocol) {
        return service.findByProtocol(protocol);
    }

    @PatchMapping("/{id}/status")
    public ServiceRequest updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateStatusDTO dto) {
        return service.updateStatus(id, dto);
    }
}
