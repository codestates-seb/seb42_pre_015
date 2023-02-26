package preproject.underdog.question.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class QuestionResponseDto {
    private long questionId;
    private long userId;
    private String userName;
    private String title;
    private String content;
    private int viewCount;
    private int voteCount;
    private int answerCount;
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
