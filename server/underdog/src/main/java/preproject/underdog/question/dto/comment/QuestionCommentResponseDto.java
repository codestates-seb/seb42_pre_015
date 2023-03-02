package preproject.underdog.question.dto.comment;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class QuestionCommentResponseDto {
    private long commentId;
    private long userId;
    private String name;
    private long questionId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
