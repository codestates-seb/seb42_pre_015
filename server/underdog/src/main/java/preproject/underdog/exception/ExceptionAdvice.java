package preproject.underdog.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)//객체의 유효성 검사(validation)를 실패한 경우 발생
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());
        return response;
    }
    /*
    CVException은 Bean Validation 'API를 사용'하여 '객체의 필드에 대한 검사'를 수행하다가 실패했을 때 발생, 주로 '서비스 계층이나 데이터 엑세스 계층'에서 처리되며, 데이터 유효성 검사를 수행하는 데 사용
    MANVException은 Spring MVC나 Spring WebFlux와 같은 Spring 웹 애플리케이션에서 발생,클라이언트로부터 전송된 요청 파라미터나 HTTP 요청 본문에서 파싱한 객체의 유효성 검사를 실패했을 때 발생
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)//객체의 유효성 검사(validation)를 실패한 경우 발생
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {
        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());
        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)//클라이언트로부터 전송된 HTTP 요청의 메서드(Method)가 서버에서 지원하지 않는 경우, 예를들어 Get을 받아야하는데 Post로 준 경우
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);
        return response;
    }

    @ExceptionHandler//로직 처리 중 발생한 예외 -> ExceptionCode에 따로 저장 -> 서비스 로직에 적용 예정
    public ResponseEntity<ErrorResponse> handleBusinessLogicException(BusinessLogicException e) {
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)//서버 내부 오류(Internal Server Error)가 발생했을 때 사용됩니다. 이 예외는 서버에서 처리할 수 없는 예외 상황이 발생했거나, 서버의 코드나 환경 설정에 문제가 있을 때 발생
    public ErrorResponse handleException(Exception e) {
        log.error("# handle Exception", e);
        final ErrorResponse response = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
        return response;
    }
}