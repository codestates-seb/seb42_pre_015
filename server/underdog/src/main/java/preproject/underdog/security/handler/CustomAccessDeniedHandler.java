package preproject.underdog.security.handler;

import lombok.extern.apachecommons.CommonsLog;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ExceptionCode;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@CommonsLog
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        new BusinessLogicException(ExceptionCode.USER_ONLY);
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
