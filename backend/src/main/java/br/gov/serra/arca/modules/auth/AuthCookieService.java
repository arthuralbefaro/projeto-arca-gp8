package br.gov.serra.arca.modules.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Duration;

@Service
public class AuthCookieService {

    public static final String ACCESS_COOKIE = "arca_access";
    public static final String REFRESH_COOKIE = "arca_refresh";
    public static final String CSRF_COOKIE = "arca_csrf";
    public static final String CSRF_HEADER = "X-ARCA-CSRF";

    private final boolean secure;
    private final String sameSite;

    public AuthCookieService(
            @Value("${arca.security.cookies.secure}") boolean secure,
            @Value("${arca.security.cookies.same-site}") String sameSite) {
        this.secure = secure;
        this.sameSite = sameSite;
    }

    public void addAuthCookies(HttpHeaders headers, String accessToken, String refreshToken, String csrfToken,
                               Duration accessMaxAge, Duration refreshMaxAge) {
        headers.add(HttpHeaders.SET_COOKIE, buildCookie(ACCESS_COOKIE, accessToken, true, accessMaxAge).toString());
        headers.add(HttpHeaders.SET_COOKIE, buildCookie(REFRESH_COOKIE, refreshToken, true, refreshMaxAge).toString());
        headers.add(HttpHeaders.SET_COOKIE, buildCookie(CSRF_COOKIE, csrfToken, false, refreshMaxAge).toString());
    }

    public void clearAuthCookies(HttpHeaders headers) {
        headers.add(HttpHeaders.SET_COOKIE, buildCookie(ACCESS_COOKIE, "", true, Duration.ZERO).toString());
        headers.add(HttpHeaders.SET_COOKIE, buildCookie(REFRESH_COOKIE, "", true, Duration.ZERO).toString());
        headers.add(HttpHeaders.SET_COOKIE, buildCookie(CSRF_COOKIE, "", false, Duration.ZERO).toString());
    }

    public String getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }

        for (Cookie cookie : cookies) {
            if (name.equals(cookie.getName()) && StringUtils.hasText(cookie.getValue())) {
                return cookie.getValue();
            }
        }

        return null;
    }

    private ResponseCookie buildCookie(String name, String value, boolean httpOnly, Duration maxAge) {
        return ResponseCookie.from(name, value)
                .httpOnly(httpOnly)
                .secure(secure)
                .sameSite(sameSite)
                .path("/")
                .maxAge(maxAge)
                .build();
    }
}
