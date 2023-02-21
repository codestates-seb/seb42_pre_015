package preproject.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class QuestionResponseDto {
    private long questionId;
    private long userId;
    private String title;
    private String content;
    private int viewCount;
    private int voteCount;
    private List<Long> tagNames;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
