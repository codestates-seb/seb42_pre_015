package preproject.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class TagResponseDto {
    private long tagId;
    private long questionId;
    private String tagName;
}
