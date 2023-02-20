package preproject.underdog.answer.dto.comment;

import lombok.Getter;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.user.entity.User;

@Getter
public class CommentPatchDto {

    private long answerCommentId;//제거
    private String content;
    private Long userId;//제거
    private Long answerId;//제거
}
