package preproject.underdog.question.dto.question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class QuestionPatchDto {
    @Length(min = 1)
    private String title;
    @Length(min = 1)
    private String content;
    @Size(max=5, message = "태그는 최대 5개까지 가능합니다.")
    private List<String> tags;
}
