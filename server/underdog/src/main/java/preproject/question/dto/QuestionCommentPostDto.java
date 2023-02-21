package preproject.question.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
public class QuestionCommentPostDto {
    @NotBlank
    private String content;
    private long userId;
    private long questionId;
}
