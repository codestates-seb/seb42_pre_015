package preproject.underdog.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {
//    ID_IS_NOT_THE_SAME(HttpStatus.BAD_REQUEST, "질문-답변-댓글 id가 일치하지 않습니다."),
    //권한
    NO_PERMISSION_CREATING_POST(403, "회원만 작성 할 수 있습니다."),
    NO_PERMISSION_EDITING_POST(403, "작성자만 수정할 수 있습니다."),
    NO_PERMISSION_DELETING_POST(403, "작성자만 삭제할 수 있습니다."),
    NO_PERMISSION_DO_VOTE(403, "회원만 투표를 할 수 있습니다."),
    NO_PERMISSION_CANCEL_VOTE(403, "회원만 투표를 취소할 수 있습니다."),
    CANNOT_VOTE_TWICE(403, "두번 이상 투표할 수 없습니다."),
    //NOT FOUND
    USER_NOT_FOUND(404,"회원을 찾을 수 없습니다."),
    QUESTION_NOT_FOUND(404,"질문을 찾을 수 없습니다."),
    ANSWER_NOT_FOUND(404, "답변을 찾을 수 없습니다."),
    ANSWER_COMMENT_NOT_FOUND(404,"코멘트를 찾을 수 없습니다."),
    QUESTION_COMMENT_NOT_FOUND(404, "코멘트를 찾을 수 없습니다."),
    VOTE_NOT_FOUND(404, "취소할 투표가 없습니다."),
    ID_IS_NOT_THE_SAME(404,"질문-답변-댓글 id가 일치하지 않습니다."),

    USER_ALREADY_EXISTS(409,"이미 등록된 이메일 입니다."),
    USER_ONLY(403,"회원만 이용 가능한 서비스 입니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
