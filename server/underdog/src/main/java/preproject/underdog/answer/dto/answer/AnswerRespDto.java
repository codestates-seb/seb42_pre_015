package preproject.underdog.answer.dto.answer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerRespDto {

    private Long answerId;
    private String content;
    private Long userId;
    private Long questionId;
    private Long voteCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
