package preproject.underdog.question.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class QuestionCommentPostDto {
    @NotNull
    private long userId; // 서비스 로직에 시큐리티 적용 후, 삭제
    @NotEmpty(message = "댓글 내용을 작성해야 합니다.")
    private String content;
}
