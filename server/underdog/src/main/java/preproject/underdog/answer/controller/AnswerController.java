package preproject.underdog.answer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.dto.comment.CommentPatchDto;
import preproject.underdog.answer.dto.comment.CommentPostDto;
import preproject.underdog.answer.dto.comment.CommentRespDto;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.mapper.AnswerMapper;
import preproject.underdog.answer.service.AnswerService;
import preproject.underdog.utils.Uri;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/question/{question-id}/answer")
@Validated
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    @PostMapping//완성
    public ResponseEntity postAnswer(@RequestBody @Valid AnswerPostDto post,
                                     @PathVariable("question-id") @Positive long questionId) {
        Answer postAnswer = answerMapper.answerPostDtoToAnswer(post);
        Answer createdAnswer = answerService.createAnswer(postAnswer, questionId);
        URI location = Uri.createUri("/question/"+ Long.toString(questionId) +"/answer/", Long.toString(createdAnswer.getAnswerId()));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}/user/{user-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("user-id") @Positive long userId,
                                      @RequestBody @Valid AnswerPatchDto patch) {
        Answer answer = answerMapper.answerPatchDtoToAnswer(patch);
        answer.setAnswerId(answerId);//필요한가? -> 필요 -> patch에 answerId 정보 없음
        Answer updated = answerService.updateAnswer(answer, questionId, userId);
        return new ResponseEntity(answerMapper.answerToAnswerRespDto(updated), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswer(@PathVariable("question-id") @Positive long questionId) {
        List<Answer> answers = answerService.getAnswer(questionId);
        List<AnswerRespDto> responses = answerMapper.answerListToAnswerRespDto(answers);
        return new ResponseEntity(responses, HttpStatus.OK);
    }

    @DeleteMapping("{answer-id}")//완성
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId,
                                       @PathVariable("question-id") @Positive long questionId) {
        answerService.deleteAnswer(questionId, answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{answer-id}/comment")//완성
    public ResponseEntity postComment(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @RequestBody @Valid CommentPostDto post) {
        AnswerComment postComment = answerMapper.commentPostDtoToAnswerComment(post);
        AnswerComment createdAnswerComment = answerService.postComment(postComment, questionId, answerId);
        URI location = Uri.createUri("/question/"+ Long.toString(questionId) +"/answer/"+Long.toString(answerId)+"/comments/", Long.toString(createdAnswerComment.getAnswerCommentId()));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}/comment/{answer-comment-id}/user/{user-id}")
    public ResponseEntity patchComment(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") @Positive long answerId,
                                       @PathVariable("answer-comment-id") @Positive long answerCommentId,
                                       @PathVariable("user-id") @Positive long userId,
                                       @RequestBody @Valid CommentPatchDto patch) {
        AnswerComment comment = answerMapper.commentPatchDtoToAnswerComment(patch);
        comment.setAnswerCommentId(answerCommentId);
        AnswerComment updated = answerService.patchComment(comment, questionId, answerId, userId);
        return new ResponseEntity(answerMapper.commentToAnswerCommentRespDto(updated), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}/comments")
    public ResponseEntity getComment(@PathVariable("question-id") @Positive long questionId,
                                     @PathVariable("answer-id") @Positive long answerId) {
        List<AnswerComment> comments = answerService.getComment(answerId, questionId);
        List<CommentRespDto> responses = answerMapper.commentListToAnswerRespDto(comments);
        return new ResponseEntity(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}/comment/{answer-comment-id}/user/{user-id}")//완성
    public ResponseEntity deleteComment(@PathVariable("answer-id") @Positive long answerId,
                                        @PathVariable("question-id") @Positive long questionId,
                                        @PathVariable("user-id") @Positive long userId,
                                        @PathVariable("answer-comment-id") @Positive long answerCommentId) {
        answerService.deleteComment(answerCommentId, questionId, answerId, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("{answer-id}/vote/user/{user-id}")
    public ResponseEntity doVote(@PathVariable("answer-id") @Positive long answerId,
                                 @PathVariable("question-id") @Positive long questionId,
                                 @PathVariable("user-id") @Positive long userId) {
        answerService.doVote(questionId, answerId, userId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("{answer-id}/vote/user/{user-id}")
    public ResponseEntity undoVote(@PathVariable("answer-id") @Positive long answerId,
                                   @PathVariable("question-id") @Positive long questionId,
                                   @PathVariable("user-id") @Positive long userId) {
        answerService.undoVote(questionId, answerId, userId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}