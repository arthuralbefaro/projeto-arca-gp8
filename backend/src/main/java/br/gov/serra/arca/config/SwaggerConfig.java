package br.gov.serra.arca.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("ARCA API")
                        .description("API do Programa ARCA - Atendimento e Registro de Cadastro Animal da Prefeitura de Serra/ES")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Prefeitura Municipal de Serra")
                                .url("https://serra.es.gov.br")
                                .email("contato@serra.es.gov.br"))
                        .license(new License()
                                .name("Uso Governamental")
                                .url("https://serra.es.gov.br")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .name("bearerAuth")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Informe o token JWT obtido em /api/auth/login")));
    }
}
