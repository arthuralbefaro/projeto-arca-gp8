package br.gov.serra.arca.common.util;

public final class PiiMasker {

    private PiiMasker() {
    }

    public static String maskTelefone(String telefone) {
        if (telefone == null) {
            return null;
        }
        String digits = telefone.replaceAll("[^0-9]", "");
        if (digits.length() < 4) {
            return "****";
        }
        String last = digits.substring(digits.length() - 2);
        return "(**) ****-**" + last;
    }
}
