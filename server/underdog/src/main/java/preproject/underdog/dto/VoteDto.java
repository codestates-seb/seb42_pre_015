package preproject.underdog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;


public class VoteDto {
    @Getter
    @AllArgsConstructor
    public static class Question{
        private long questionId;
        private int voteCount;
        private long userId;
        private boolean userVote;
    }

    @Getter
    @AllArgsConstructor
    public static class Answer{
        private long answerId;
        private int voteCount;
        private long userId;
        private boolean userVote;
    }
}
