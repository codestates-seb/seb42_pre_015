package preproject.underdog.exception;

import lombok.Getter;

public enum ExceptionCode {
    //400

    //403

    //404
    MEMBER_NOT_FOUND(404,"Comment not found"),
    QUESTION_NOT_FOUND(404,"Question not found"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    ANSWER_COMMENT_NOT_FOUND(404,"Comment not found"),
    QUESTION_COMMENT_NOT_FOUND(404, "Comment not found"),
    VOTE_NOT_FOUND(404, "Vote not found"),
    //405

    //409
    USER_ALREADY_EXISTS(409,"User already exists"),

    //
    ;

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
