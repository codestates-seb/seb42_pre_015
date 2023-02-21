package preproject.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;

public class TagAllDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private long questionId;
        private String tagName;

    }
    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long id;
        private String tagName;
    }
}
