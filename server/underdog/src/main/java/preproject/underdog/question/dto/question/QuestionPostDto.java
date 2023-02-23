package preproject.underdog.question.dto.question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class QuestionPostDto {
    @NotNull
    private long userId;
    @NotEmpty(message = "질문 제목을 작성해야 합니다.")
    private String title;
    @NotEmpty(message = "질문 내용을 작성해야 합니다.")
    private String content;
    @Size(max=5, message = "태그는 최대 5개까지 가능합니다.")
    private List<String> tags;
}
