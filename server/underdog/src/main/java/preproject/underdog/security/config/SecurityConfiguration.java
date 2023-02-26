package preproject.underdog.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
import preproject.underdog.security.handler.CustomAuthenticationSuccessHandler;
import preproject.underdog.security.handler.OAuth2SuccessHandler;
import preproject.underdog.security.jwt.JwtTokenizer;
import preproject.underdog.security.utils.CustomAuthorityUtils;
import preproject.underdog.user.repository.UserRepository;
import preproject.underdog.user.service.UserService;

import java.util.Arrays;

@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserService userService;
    private final UserRepository userRepository;

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

//                .rememberMe()
//                .key("uniqueAndSecret")
//                .rememberMeCookieName("my-remember-me-cookie")
//                .tokenValiditySeconds(24 * 60 * 60) // 24 hours
//                .rememberMeParameter("remember-me")
//                .userDetailsService(userDetailsService);

                .cors().configurationSource(corsConfigurationSource())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()

                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/login").permitAll()
                        .antMatchers("/user").permitAll()
                        .antMatchers(HttpMethod.GET, "/question/**").permitAll()
                        .anyRequest().authenticated()) // 요청별 권한 작성하기
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2SuccessHandler(jwtTokenizer, userService)));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("POST", "PATCH", "GET", "DELETE"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(jwtTokenizer, authenticationManager);// (2-4)
//            customAuthenticationFilter.setFilterProcessesUrl("/auth/login"); //request URL - 디폴트는 /login
            customAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler());  // (3) 추가
//            customAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());
//
            VerificationFilter verificationFilter = new VerificationFilter(jwtTokenizer, authorityUtils, userRepository);

            builder
                    .addFilter(customAuthenticationFilter)
                    .addFilterAfter(verificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
