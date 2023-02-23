package preproject.underdog.answer.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.user.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor//API 작성 후 삭제
public class CommentPostDto {
    @NotEmpty(message = "답변 내용을 작성해야 합니다.")
    private String content;
    @NotNull
    private Long userId;
}
