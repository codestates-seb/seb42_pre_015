package preproject.underdog.question.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Setter
@Getter
public class QuestionCommentPatchDto {
    @NotEmpty(message = "댓글 내용을 작성해야 합니다.")
    private String content;
}
