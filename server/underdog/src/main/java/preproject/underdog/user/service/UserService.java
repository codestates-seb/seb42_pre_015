package preproject.underdog.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ExceptionCode;
import preproject.underdog.security.utils.CustomAuthorityUtils;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.mail.UserRegistrationApplicationEvent;
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
        optionalUser.ifPresent(u -> new BusinessLogicException(ExceptionCode.USER_ALREADY_EXISTS));
//                publisher.publishEvent(new UserRegistrationApplicationEvent(this))); // 이벤트 로직 추가
        // 이미 가입한 회원의 경우, 2가지 경우로 나뉜다.
        // OAuth로 가입한 경우, 비밀번호가 없어서 비밀번호를 생성할 수 있는 링크를 메일로 보냄
        // 비밀번호가 틀린 경우, 새로운 비밀번호를 생성할 수 있는 링크를 메일로 보냄
        // 즉, 두 가지 경우 모두 새로운 비밀번호를 생성할 수 있는 링크를 메일로 보낸다.
        // 이벤트 퍼블리셔 사용.//

        if(user.getPassword()!=null) user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        publisher.publishEvent(new UserRegistrationApplicationEvent(this, savedUser));
        return savedUser;
    }

    public User verifyUser(long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        User foundUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return foundUser;
    }

    public User verifyUser(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User foundUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return foundUser;
    }

    public void deleteUser(long userId) {
        verifyUser(userId);
        userRepository.deleteById(userId);
    }
}
