package preproject.underdog.user.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import preproject.underdog.user.dto.UserDto.Post;
import preproject.underdog.user.entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-26T14:18:17+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User postDtoToUser(Post post) {
        if ( post == null ) {
            return null;
        }

        User user = new User();

        user.setName( post.getName() );
        user.setEmail( post.getEmail() );
        user.setPassword( post.getPassword() );

        return user;
    }
}
