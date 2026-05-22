package br.gov.serra.arca.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CpfValidator implements ConstraintValidator<ValidCpf, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return false;
        }
        String cpf = value.replaceAll("[^0-9]", "");
        if (cpf.length() != 11) {
            return false;
        }
        if (cpf.chars().distinct().count() == 1) {
            return false;
        }
        return validateDigit(cpf, 9) && validateDigit(cpf, 10);
    }

    private boolean validateDigit(String cpf, int position) {
        int sum = 0;
        for (int i = 0; i < position; i++) {
            sum += Character.getNumericValue(cpf.charAt(i)) * (position + 1 - i);
        }
        int remainder = (sum * 10) % 11;
        if (remainder == 10) {
            remainder = 0;
        }
        return remainder == Character.getNumericValue(cpf.charAt(position));
    }
}
