package preproject.underdog.user.mapper;

import org.mapstruct.Mapper;
import preproject.underdog.user.dto.UserDto;
import preproject.underdog.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User postDtoToUser(UserDto.Post post);
}
