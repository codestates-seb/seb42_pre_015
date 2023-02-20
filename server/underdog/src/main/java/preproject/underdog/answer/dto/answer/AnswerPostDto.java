package preproject.underdog.answer.dto.answer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor // 테스트
@NoArgsConstructor
public class AnswerPostDto {

    @NotBlank(message = "답변 내용을 작성해야 합니다.")
    private String content;
    @NotNull
    private Long userId;
    @NotNull
    private Long questionId;
}
