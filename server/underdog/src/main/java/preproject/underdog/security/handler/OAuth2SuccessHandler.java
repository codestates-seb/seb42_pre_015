package preproject.underdog.security.handler;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import preproject.underdog.security.jwt.JwtTokenizer;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;

@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, java.io.IOException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email")); // (3)

        User user = saveUser(email);
        redirect(request, response, user);  // (6)
    }

    private User saveUser(String email) { // 이미 디비에 있으면 이 로직 건너 뛰기?
        User user = new User();
        user.setEmail(email);
        return userService.createUser(user);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, User user)
            throws IOException, java.io.IOException {
        String accessToken = jwtTokenizer.delegateAccessToken(user);
        String refreshToken = jwtTokenizer.delegateRefreshToken(user);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

//        String uri = createURI(accessToken, refreshToken).toString();   // (6-3)
        log.info("# Authenticated successfully!");
//        getRedirectStrategy().sendRedirect(request, response, null);   // (6-4)
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .port(80)
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
