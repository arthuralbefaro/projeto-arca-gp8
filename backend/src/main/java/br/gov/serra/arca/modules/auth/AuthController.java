package br.gov.serra.arca.modules.auth;

import br.gov.serra.arca.common.dto.ApiResponseDTO;
import br.gov.serra.arca.modules.auth.dto.AuthResponseDTO;
import br.gov.serra.arca.modules.auth.dto.LoginRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "Endpoints de autenticação para o painel administrativo")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(
            summary = "Fazer login",
            description = "Autentica um usuário administrador e retorna um token JWT."
    )
    public ResponseEntity<ApiResponseDTO<AuthResponseDTO>> login(
            @Valid @RequestBody LoginRequestDTO dto) {
        AuthResponseDTO response = authService.login(dto);
        return ResponseEntity.ok(ApiResponseDTO.ok(response, "Login realizado com sucesso."));
    }
}
