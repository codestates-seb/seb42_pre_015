package preproject.underdog.question.dto.tag;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class TagResponseDto {
    private long tagId;
    private long questionId;
    private String tagName;
}
