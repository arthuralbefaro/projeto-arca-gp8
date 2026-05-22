package br.gov.serra.arca.modules.tutors;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tutors")
public class Tutor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String cpf;

    private String email;

    @Column(nullable = false)
    private String phone;

    private String cep;

    @Column(nullable = false)
    private String bairro;

    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "requester_type", nullable = false)
    private RequesterType requesterType;

    @Column(name = "vulnerable_area", nullable = false)
    private boolean vulnerableArea;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }
    public String getBairro() { return bairro; }
    public void setBairro(String bairro) { this.bairro = bairro; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public RequesterType getRequesterType() { return requesterType; }
    public void setRequesterType(RequesterType requesterType) { this.requesterType = requesterType; }
    public boolean isVulnerableArea() { return vulnerableArea; }
    public void setVulnerableArea(boolean vulnerableArea) { this.vulnerableArea = vulnerableArea; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
