package preproject.underdog.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import preproject.underdog.security.utils.CustomAuthorityUtils;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final ApplicationEventPublisher publisher;
    public User createUser(User user){
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        optionalUser.ifPresent(u -> new RuntimeException("이미 등록된 회원입니다."));
//                publisher.publishEvent(new UserRegistrationApplicationEvent(this))); // 이벤트 로직 추가
        // 이미 가입한 회원의 경우, 2가지 경우로 나뉜다.
        // OAuth로 가입한 경우, 비밀번호가 없어서 비밀번호를 생성할 수 있는 링크를 메일로 보냄
        // 비밀번호가 틀린 경우, 새로운 비밀번호를 생성할 수 있는 링크를 메일로 보냄
        // 즉, 두 가지 경우 모두 새로운 비밀번호를 생성할 수 있는 링크를 메일로 보낸다.
        // 이벤트 퍼블리셔 사용.//

        if(user.getPassword()!=null) user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        //회원가입 시, 로그인 처리하기(토큰 발급)

        return userRepository.save(user);
    }
}
