package preproject.underdog.security.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import preproject.underdog.security.jwt.JwtTokenizer;
import preproject.underdog.security.utils.CustomAuthorityUtils;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.repository.UserRepository;
import preproject.underdog.user.service.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.module.Configuration;
import java.util.*;

@RequiredArgsConstructor
public class VerificationFilter extends OncePerRequestFilter {  // (1)
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserRepository userRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // (1)
        try {
            Map<String, Object> claims = verifyAccessJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            verifyRefreshJws(request, response);   // 액세스 토큰 만료시, 리프레시 토큰 확인
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");  // (6-1)

        return authorization == null || !authorization.startsWith("Bearer");  // (6-2)
    }

    private Map<String, Object> verifyAccessJws(HttpServletRequest request) {
        String accessJws = request.getHeader("Authorization").replace("Bearer ", ""); // (3-1)
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); // (3-2)
        Map<String, Object> claims = jwtTokenizer.getClaims(accessJws, base64EncodedSecretKey).getBody();   // (3-3)

        return claims;
    }

    private void verifyRefreshJws(HttpServletRequest request, HttpServletResponse response) {
        String refreshJws = request.getHeader("Refresh");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); // (3-2)

        try {
            Jws<Claims> claims = jwtTokenizer.getClaims(refreshJws, base64EncodedSecretKey);// refresh 토큰 검증
            //리프레시 토큰 유효 -> 액세스 토큰 재발급.
            String email = claims.getBody().getSubject();
            Optional<User> optionalUser = userRepository.findByEmail(email);
            User user = optionalUser.orElseThrow(()->new RuntimeException("유저 정보 없음"));

            String accessToken = jwtTokenizer.delegateAccessToken(user);   // (4-2)
            String refreshToken = jwtTokenizer.delegateRefreshToken(user);
            response.setHeader("Authorization", "Bearer " + accessToken);  // (4-4)
            response.setHeader("Refresh", refreshToken);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");   // (4-1)
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));  // (4-2)
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);  // (4-3)
        SecurityContextHolder.getContext().setAuthentication(authentication); // (4-4)
    }
}