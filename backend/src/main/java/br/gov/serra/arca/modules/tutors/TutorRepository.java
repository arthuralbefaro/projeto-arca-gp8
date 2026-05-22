package br.gov.serra.arca.modules.tutors;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface TutorRepository extends JpaRepository<Tutor, UUID> {
    Optional<Tutor> findByCpf(String cpf);
}
