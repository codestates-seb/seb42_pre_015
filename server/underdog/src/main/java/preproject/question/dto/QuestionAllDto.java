package preproject.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionAllDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotBlank
        private String content;
        private long userId;
        private long questionId;
        @NotBlank
        private String title;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch{
        @NotNull
        private String content;
        private String title;
    }
    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long questionId;
        private long userId;
        private String title;
        private String content;
        private int viewCount;
        private int voteCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private long questionCommentId;

    }

}
