package preproject.underdog.answer.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@NoArgsConstructor
@AllArgsConstructor//API 작성 후 삭제
public class CommentPatchDto {
    @NotEmpty(message = "답변 내용을 작성해야 합니다.")
    private String content;
}
