package preproject.underdog.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.apachecommons.CommonsLog;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ErrorResponse;
import preproject.underdog.exception.ExceptionCode;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@CommonsLog
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

        response.resetBuffer();
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("text/html; charset=UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        response.setCharacterEncoding("UTF-8");

        response.getOutputStream().print(new ObjectMapper().writeValueAsString(List.of("status: " +HttpStatus.FORBIDDEN.value(),
                "messege: " +HttpStatus.FORBIDDEN.getReasonPhrase())));
        response.flushBuffer();

        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
