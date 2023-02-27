package preproject.underdog.security.handler;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ErrorResponse;
import preproject.underdog.exception.ExceptionCode;
import preproject.underdog.user.dto.UserDto;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.mapper.UserMapper;
import preproject.underdog.user.repository.UserRepository;
import preproject.underdog.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final UserService userService;
    private final UserMapper mapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 인증 성공 후, 로그를 기록하거나 사용자 정보를 response로 전송하는 등의 추가 작업을 할 수 있다.
        //Authentication 객체에 사용자 정보를 얻은 후, HttpServletResponse로 출력 스트림을 생성하여 response를 전송할 수 있다
        log.info("# Authenticated successfully!");

        Gson gson = new Gson();     // (2-1)
        // TODO 널포인트 익셉션 남. 이메일이 제대로 반환되지 않음.
        String email = authentication.getPrincipal().toString();
        User user = userService.verifyUser(email);
        UserDto.Response userToResponseDto = mapper.userToResponseDto(user);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);    // (2-3)
        response.setStatus(HttpStatus.OK.value());          // (2-4)
        response.getWriter().write(gson.toJson(userToResponseDto, UserDto.Response.class));

//        response.sendRedirect(null); // 원래 default는 루트("/")로 이동 --> 주석 처리 안 하면 302 에러 남
    }
}
