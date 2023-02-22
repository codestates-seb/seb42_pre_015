package preproject.underdog.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import preproject.underdog.user.dto.UserDto;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.mapper.UserMapper;
import preproject.underdog.user.service.UserService;
import preproject.underdog.utils.Uri;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final String DEFAULT_URI = "/user/";
    private final UserMapper mapper;
    private final UserService userService;

    @PostMapping
    public ResponseEntity postUser(@RequestBody @Valid UserDto.Post post) {
        User postUser = mapper.postDtoToUser(post);
        User createdUser = userService.createUser(postUser);
        URI location = Uri.createUri(DEFAULT_URI, Long.toString(createdUser.getUserId()));
        return ResponseEntity.created(location).build();
    }
}
