package preproject.underdog.answer.dto.answer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor//API 작성 후 삭제
public class AnswerPatchDto {

    @NotBlank(message = "답변 내용을 작성해야 합니다.")
    private String content;
}
