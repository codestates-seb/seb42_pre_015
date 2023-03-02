package preproject.underdog.user.mail;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import preproject.underdog.user.entity.User;


@Getter
public class UserRegistrationApplicationEvent extends ApplicationEvent {
    private User user;

    public UserRegistrationApplicationEvent(Object source, User user) {
        super(source);
        this.user = user;
    }
}
