package br.gov.serra.arca.modules.historico;

import br.gov.serra.arca.modules.solicitacoes.Solicitacao;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "historico_status")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitacao_id", nullable = false)
    private Solicitacao solicitacao;

    @Column(nullable = false, length = 30)
    private String status;

    @Column(length = 500)
    private String nota;

    @Column(nullable = false)
    private LocalDateTime data;

    @PrePersist
    protected void onCreate() {
        if (data == null) {
            data = LocalDateTime.now();
        }
    }
}
