package preproject.underdog.answer.dto.answer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import preproject.underdog.question.entity.Question;
import preproject.underdog.user.entity.User;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor // 테스트
public class AnswerPostDto {

    @NotBlank(message = "답변 내용을 작성해야 합니다.")
    private String content;

    private Long userId;

    private Long questionId;
}
