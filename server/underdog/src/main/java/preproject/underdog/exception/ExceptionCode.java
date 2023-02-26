package preproject.underdog.exception;

import lombok.Getter;

public enum ExceptionCode {

    //403
    NO_PERMISSION_EDITING_QUESTION(403, "질문 작성자만 수정할 수 있습니다."),
    NO_PERMISSION_EDITING_ANSWER(403, "답변 작성자만 수정할 수 있습니다."),
    NO_PERMISSION_EDITING_COMMENT(403, "댓글 작성자만 수정할 수 있습니다."),
    //404
    USER_NOT_FOUND(404,"User not found"),
    QUESTION_NOT_FOUND(404,"Question not found"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    ANSWER_COMMENT_NOT_FOUND(404,"Comment not found"),
    QUESTION_COMMENT_NOT_FOUND(404, "Comment not found"),
    VOTE_NOT_FOUND(404, "Vote not found"),
    //405

    //409
    USER_ALREADY_EXISTS(409,"User already exists");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
