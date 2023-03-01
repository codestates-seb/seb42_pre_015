package preproject.underdog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
public class VoteDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Question{
        private long questionId;
        private Integer voteCount;
        private Long userId;
        private boolean userVote;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Answer{
        private long answerId;
        private int voteCount;
        private Long userId;
        private boolean userVote;
    }
}
