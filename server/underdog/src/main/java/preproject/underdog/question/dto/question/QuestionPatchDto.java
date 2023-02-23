package preproject.underdog.question.dto.question;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
@AllArgsConstructor
public class QuestionPatchDto {
    @NotEmpty(message = "질문 제목을 작성해야 합니다.")
    private String title;
    @NotEmpty(message = "질문 내용을 작성해야 합니다.")
    private String content;
}