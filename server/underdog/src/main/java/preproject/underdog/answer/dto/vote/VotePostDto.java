package preproject.underdog.answer.dto.vote;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor//API 작성 후 삭제
public class VotePostDto {

    @NotNull
    private Long userId;
    @NotNull
    private Long answerId;
}
