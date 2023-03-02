package preproject.underdog.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.mapper.UserMapper;
import preproject.underdog.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 인증 성공 후, 로그를 기록하거나 사용자 정보를 response로 전송하는 등의 추가 작업을 할 수 있다.
        //Authentication 객체에 사용자 정보를 얻은 후, HttpServletResponse로 출력 스트림을 생성하여 response를 전송할 수 있다
        log.info("# Authenticated successfully!");

        System.out.println("name : " + authentication.getName());
        User verifyUser = userService.verifyUser(authentication.getName());

        response.resetBuffer();
        response.setStatus(HttpStatus.OK.value());
        response.setContentType("text/html; charset=UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        response.setCharacterEncoding("UTF-8");

        String str = new String(verifyUser.getName().getBytes("UTF-8"), "ISO-8859-1");

        response.getOutputStream().print(new ObjectMapper().writeValueAsString(
                List.of("userId: " + verifyUser.getUserId(), "email: " + verifyUser.getEmail(), "name: " + str)));
        response.flushBuffer();

//        response.sendRedirect(null); // 원래 default는 루트("/")로 이동 --> 주석 처리 안 하면 302 에러 남
    }
}
