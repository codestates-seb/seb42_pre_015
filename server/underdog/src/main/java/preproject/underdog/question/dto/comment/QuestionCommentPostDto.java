package preproject.underdog.question.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class QuestionCommentPostDto {
    @NotEmpty(message = "댓글 내용을 작성해야 합니다.")
    private String content;
    @NotNull
    private long userId;
}
