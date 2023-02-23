package preproject.underdog.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.underdog.dto.PageDto;
import preproject.underdog.question.dto.comment.QuestionCommentPatchDto;
import preproject.underdog.question.dto.comment.QuestionCommentPostDto;
import preproject.underdog.question.dto.question.QuestionPatchDto;
import preproject.underdog.question.dto.question.QuestionPostDto;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;
import preproject.underdog.question.mapper.QuestionMapper;
import preproject.underdog.question.service.QuestionService;
import preproject.underdog.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/question")
@Validated //Question 관련 컨트롤러 메서드
@RequiredArgsConstructor
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "/question";
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto) {
        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
        Question createQuestion = questionService.createQuestion(question);
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createQuestion.getQuestionId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}/user/{user-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @PathVariable("user-id") @Positive long userId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {
        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
        question.setQuestionId(questionId);
        Question editedQuestion = questionService.editQuestion(question, userId);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(editedQuestion), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId) {
       Question question = questionService.getQuestion(questionId);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(Pageable pageable) {
        Page<Question> questionPage = questionService.getQuestions(pageable);
        List<Question> questionList = questionPage.getContent();
        return new ResponseEntity<>(new PageDto<>(mapper.questionsToResponseDto(questionList), questionPage), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId) {
        questionService.deleteQuestion(questionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    //question 밑에 있는 comment 관련 컨트롤러 메서드
    @PostMapping("/{question-id}/comment")
    public ResponseEntity postComment(@PathVariable("question-id") @Positive long questionId,
                                      @RequestBody QuestionCommentPostDto questionCommentPostDto) {
        QuestionComment questionComment = mapper.commentPostDtoToQuestionComment(questionCommentPostDto);
        QuestionComment createComment = questionService.createQuestionComment(questionComment, questionId);
        return new ResponseEntity(mapper.commentToCommentResponseDto(createComment), HttpStatus.OK);
    }

    @PatchMapping("/{question-id}/comment/{comment-id}/user/{user-id}")
    public ResponseEntity patchComment(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("comment-id") @Positive long commentId,
                                       @PathVariable("user-id") @Positive long userId,
                                       @RequestBody QuestionCommentPatchDto questionPatchDto) {
        QuestionComment questionComment = mapper.commentPatchDtoToQuestionComment(questionPatchDto);
        QuestionComment editComment = questionService.editQuestionComment(questionComment, questionId, commentId, userId);
        return new ResponseEntity(mapper.commentToCommentResponseDto(editComment), HttpStatus.OK);
    }

    @GetMapping("/{question-id}/comment") // 질문글 코멘트 정렬은 프론트에서
    public ResponseEntity getComments(@PathVariable("question-id") long questionId) {
        List<QuestionComment> comments = questionService.getQuestionComments(questionId);
        return new ResponseEntity(mapper.commentsToResponseDto(comments), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/comment/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("question-id") long questionId,
                                         @PathVariable("comment-id") long commentId){
        questionService.deleteQuestionComment(commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    //vote 기능 메서드
    @PostMapping("/{question-id}/vote/user/{user-id}")
    public ResponseEntity postVote(@PathVariable("question-id") long questionId,
                                   @PathVariable("user-id") long userId) {
        questionService.createVote(userId, questionId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/vote/user/{user-id}")
    public ResponseEntity deleteVote(@PathVariable("question-id") long questionId,
                                     @PathVariable("user-id") long userId) {
       questionService.cancelVote(questionId, userId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}