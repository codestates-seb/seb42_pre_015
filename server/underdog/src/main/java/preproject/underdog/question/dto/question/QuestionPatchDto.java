package preproject.underdog.question.dto.question;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
@AllArgsConstructor
public class QuestionPatchDto {
    private String title;
    private String content;
}
