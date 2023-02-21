package preproject.underdog.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import preproject.underdog.security.filter.CustomAuthenticationFilter;
import preproject.underdog.security.filter.VerificationFilter;
import preproject.underdog.security.handler.OAuth2SuccessHandler;
import preproject.underdog.security.jwt.JwtTokenizer;
import preproject.underdog.security.utils.CustomAuthorityUtils;
import preproject.underdog.user.service.UserService;

import java.util.Arrays;

@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic().disable()
                .formLogin().disable()
//                .defaultSuccessUrl("/") // 로그인 성공시 리턴 페이지
//                .loginProcessingUrl("/login") // 로그인 요청시 처리는 시큐리티가. 디폴트 uri
//                .and()
                .logout().logoutUrl("/logout").permitAll()
                .logoutSuccessUrl("/") // 로그아웃 성공 시 이동 페이지
                .and()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll())
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2SuccessHandler(jwtTokenizer, authorityUtils, userService)));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("POST", "PATCH", "GET", "DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(jwtTokenizer, authenticationManager);  // (2-4)
//            customAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler());  // (3) 추가
//            customAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());
//
            VerificationFilter verificationFilter = new VerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(customAuthenticationFilter)
                    .addFilterAfter(verificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
