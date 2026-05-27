package br.gov.serra.arca.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CpfValidator implements ConstraintValidator<ValidCpf, String> {

    @Override
    public void initialize(ValidCpf constraintAnnotation) {
    }

    @Override
    public boolean isValid(String cpf, ConstraintValidatorContext context) {
        if (cpf == null || cpf.isBlank()) {
            return false;
        }

        // remove caracteres não numéricos
        String digits = cpf.replaceAll("[^0-9]", "");

        if (digits.length() != 11) {
            return false;
        }

        // rejeita CPFs com todos os dígitos iguais
        if (digits.chars().distinct().count() == 1) {
            return false;
        }

        // valida o primeiro dígito verificador
        int sum = 0;
        for (int i = 0; i < 9; i++) {
            sum += (digits.charAt(i) - '0') * (10 - i);
        }
        int firstDigit = 11 - (sum % 11);
        if (firstDigit >= 10) firstDigit = 0;

        if (firstDigit != (digits.charAt(9) - '0')) {
            return false;
        }

        // valida o segundo dígito verificador
        sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += (digits.charAt(i) - '0') * (11 - i);
        }
        int secondDigit = 11 - (sum % 11);
        if (secondDigit >= 10) secondDigit = 0;

        return secondDigit == (digits.charAt(10) - '0');
    }
}
