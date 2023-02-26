package preproject.underdog.answer.dto.answer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerPostDto { // userId 삭제, mapper도 수정
    @NotEmpty(message = "답변 내용을 작성해야 합니다.")
    private String content;
}
