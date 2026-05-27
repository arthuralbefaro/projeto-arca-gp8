package br.gov.serra.arca.modules.solicitacoes;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "solicitacoes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 30)
    private String protocolo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TipoSolicitacao tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private StatusSolicitacao status = StatusSolicitacao.RECEBIDO;

    @Column(name = "tutor_nome", nullable = false)
    private String tutorNome;

    @Column(name = "tutor_cpf", nullable = false, length = 11)
    private String tutorCpf;

    @Column(name = "tutor_email")
    private String tutorEmail;

    @Column(name = "tutor_telefone", length = 20)
    private String tutorTelefone;

    @Column(name = "tutor_cep", length = 9)
    private String tutorCep;

    @Column(name = "tutor_bairro", length = 100)
    private String tutorBairro;

    @Column(name = "tutor_endereco", length = 500)
    private String tutorEndereco;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_solicitante", nullable = false, length = 20)
    private TipoSolicitante tipoSolicitante;

    @Column(name = "tutor_nis", length = 20)
    private String tutorNis;

    @Column(name = "animal_nome", length = 100)
    private String animalNome;

    @Enumerated(EnumType.STRING)
    @Column(name = "animal_especie", length = 20)
    private EspecieAnimal animalEspecie;

    @Column(name = "animal_sexo", length = 30)
    private String animalSexo;

    @Column(name = "animal_porte", length = 20)
    private String animalPorte;

    @Column(name = "animal_quantidade", nullable = false)
    @Builder.Default
    private int animalQuantidade = 1;

    @Enumerated(EnumType.STRING)
    @Column(name = "vacinado_raiva", length = 20)
    private VacinacaoStatus vacinadoRaiva;

    @Enumerated(EnumType.STRING)
    @Column(name = "animal_sintomas", length = 20)
    private VacinacaoStatus animalSintomas;

    @Column(name = "situacao_risco", nullable = false)
    @Builder.Default
    private boolean situacaoRisco = false;

    @Column(name = "area_vulneravel", nullable = false)
    @Builder.Default
    private boolean areaVulneravel = false;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Column(name = "prioridade_score", nullable = false)
    @Builder.Default
    private int prioridadeScore = 0;

    @Column(name = "prioridade_label", nullable = false, length = 10)
    @Builder.Default
    private String prioridadeLabel = "Baixa";

    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criadoEm;

    @Column(name = "atualizado_em", nullable = false)
    private LocalDateTime atualizadoEm;

    @PrePersist
    protected void onCreate() {
        criadoEm = LocalDateTime.now();
        atualizadoEm = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        atualizadoEm = LocalDateTime.now();
    }
}
