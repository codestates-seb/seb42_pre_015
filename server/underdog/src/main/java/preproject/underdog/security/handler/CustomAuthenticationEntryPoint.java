package preproject.underdog.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ErrorResponse;
import preproject.underdog.exception.ExceptionCode;
import preproject.underdog.user.entity.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");

        response.resetBuffer();
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("text/html; charset=UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        response.setCharacterEncoding("UTF-8");

        response.getOutputStream().print(new ObjectMapper().writeValueAsString(List.of("status: " +HttpStatus.UNAUTHORIZED.value(),
                "messege: " +HttpStatus.UNAUTHORIZED.getReasonPhrase())));
        response.flushBuffer();

        logExceptionMessage(authException, exception);
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }
}
