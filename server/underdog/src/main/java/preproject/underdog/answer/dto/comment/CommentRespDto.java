package preproject.underdog.answer.dto.comment;

import lombok.Getter;
import preproject.underdog.question.entity.Question;
import preproject.underdog.user.entity.User;

import java.time.LocalDateTime;

@Getter
public class CommentRespDto {

    private Long answerCommentId;
    private Long answerId;
    private String content;
    private Long userId;
    private Long questionId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
