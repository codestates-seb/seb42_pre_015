package preproject.underdog.user.mapper;

import org.mapstruct.Mapper;
import preproject.underdog.user.dto.UserDto;
import preproject.underdog.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper { // 맵 스트럭트 라이브러리 빌드.그래이들에 추가
    User postDtoToUser(UserDto.Post post);
}
