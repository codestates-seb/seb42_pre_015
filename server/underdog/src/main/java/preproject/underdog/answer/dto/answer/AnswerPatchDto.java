package preproject.underdog.answer.dto.answer;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class AnswerPatchDto {

    @NotBlank(message = "답변 내용을 작성해야 합니다.")//;,;
    private String content;
}
