package preproject.underdog.answer.dto.answer;

import lombok.Getter;
import preproject.underdog.question.entity.Question;
import preproject.underdog.user.entity.User;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Getter
public class AnswerPatchDto {

    private Long answerId;//제거
    @NotBlank(message = "답변 내용을 작성해야 합니다.")//;,;
    private String content;
    private Long userId;//제거
    private Long questionId;//제거
}
