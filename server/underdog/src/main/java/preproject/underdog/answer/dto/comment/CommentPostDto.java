package preproject.underdog.answer.dto.comment;

import lombok.Getter;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.user.entity.User;

import javax.validation.constraints.NotBlank;

@Getter
public class CommentPostDto {

    @NotBlank(message = "댓글 내용을 작성해야 합니다.")
    private String content;
    private Long userId;
    private Long answerId;
}
