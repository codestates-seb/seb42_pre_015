package preproject.underdog.answer.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import preproject.underdog.question.entity.Question;
import preproject.underdog.user.entity.User;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor//API 작성 후 삭제
public class CommentRespDto {
    private Long answerCommentId;
    private Long answerId;
    private String content;
    private Long userId;
    private String name;
    private Long questionId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
