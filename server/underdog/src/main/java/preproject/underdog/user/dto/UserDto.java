package preproject.underdog.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class UserDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        @NotNull
        @Pattern(regexp = "[a-z|A-Z|가-힣]+", message = "영문 또는 한글 이름을 작성해주세요.")
        private String name;

        @NotNull
        @Email
        private String email;

        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "비밀번호는 최소 8자리로, 숫자 1개와 문자 1개 이상을 포함해야 합니다.")
        private String password;
    }

//    public static class Patch{
//        private String name;
//        private String password;
//    }
}
