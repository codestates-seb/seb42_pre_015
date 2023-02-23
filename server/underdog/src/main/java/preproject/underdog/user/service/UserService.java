package preproject.underdog.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public User createUser(User user){
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        optionalUser.ifPresent(u -> new RuntimeException("이미 가입한 회원입니다."));
        // 이미 가입한 회원의 경우, 2가지 경우로 나뉜다.
        // OAuth로 가입한 경우, 비밀번호가 없어서 비밀번호를 생성할 수 있는 링크를 메일로 보냄
        // 비밀번호가 틀린 경우, 새로운 비밀번호를 생성할 수 있는 링크를 메일로 보냄
        // 즉, 두 가지 경우 모두 새로운 비밀번호를 생성할 수 있는 링크를 메일로 보낸다.
        // 이벤트 퍼블리셔 사용.//

        return userRepository.save(user);
    }

    public User verifyUser(long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        User foundUser = optionalUser.orElseThrow(() -> new RuntimeException("유저 없음"));
        return foundUser;
    }
}
