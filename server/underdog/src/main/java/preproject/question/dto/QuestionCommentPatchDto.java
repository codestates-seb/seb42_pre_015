package preproject.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Setter
@Getter
public class QuestionCommentPatchDto {
    @NotNull
    private String content;
}
