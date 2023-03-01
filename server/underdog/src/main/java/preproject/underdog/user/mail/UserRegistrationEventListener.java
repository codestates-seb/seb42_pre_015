package preproject.underdog.user.mail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.service.UserService;

@EnableAsync
@Component
@Slf4j
@RequiredArgsConstructor
public class UserRegistrationEventListener {
    @Value("${mail.subject.member.registration}") //"Thank you for joining our cafe!" 메시지 주입
    private String subject;
    private final EmailSender emailSender;
    private final UserService userService;

    @Async
    @EventListener
    public void listen(UserRegistrationApplicationEvent event) throws Exception {
        try {
            String[] to = new String[]{event.getUser().getEmail()};
            String message = event.getUser().getEmail() + "님, 회원 가입이 성공적으로 완료되었습니다.";
            emailSender.sendEmail(to, subject, message);
        } catch (MailSendException e) {
            e.printStackTrace();
            log.error("MailSendException: rollback for Member Registration:");
            User user = event.getUser();
            userService.deleteUser(user.getUserId());
        }
    }
}
