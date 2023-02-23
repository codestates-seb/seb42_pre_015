package preproject.underdog.question.dto.question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class QuestionPatchDto {
    @Length(min = 1)
    private String title;
    @Length(min = 1)
    private String content;
}
