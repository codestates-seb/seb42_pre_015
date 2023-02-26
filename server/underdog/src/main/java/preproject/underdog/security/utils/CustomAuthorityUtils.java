package preproject.underdog.security.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    @Value("${mail.address.admin}")
    private String adminMailAddress;

    //권한 리스트 생성
    private final List<GrantedAuthority> ADMIN_ROLES
            = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");

    private final List<GrantedAuthority> USER_ROLES
            = AuthorityUtils.createAuthorityList("ROLE_USER");

    //DB 저장용 권한 String 리스트 생성
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");

    //권한 생성 메서드. 관리자 이메일인 경우, 관리자 권한 부여
    public List<GrantedAuthority> createAuthorities(String email){
        if(email.equals(adminMailAddress)) return ADMIN_ROLES;
        return USER_ROLES;
    }

    //DB 저장용
    public List<String> createRoles(String email){
        if(email.equals(adminMailAddress)) return ADMIN_ROLES_STRING;
        return USER_ROLES_STRING;
    }

    // DB에 저장된 Role을 기반으로 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return authorities;
    }
}
