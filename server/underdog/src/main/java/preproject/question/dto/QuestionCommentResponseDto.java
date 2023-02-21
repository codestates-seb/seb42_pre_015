package preproject.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class QuestionCommentResponseDto {
    private long questionCommentId;
    private long userId;
    private long questionId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
