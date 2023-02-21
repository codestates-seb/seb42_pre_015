package preproject.underdog.answer.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.user.entity.User;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor//API 작성 후 삭제
public class CommentPatchDto {

    @NotBlank
    private String content;
}
