package preproject.underdog.question.dto.tag;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
@NoArgsConstructor
public class TagResponseDto {
    private long tagId;
    private long questionId;
    private String name;
}
