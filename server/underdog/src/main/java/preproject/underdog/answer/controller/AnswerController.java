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
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/question/{question-id}/answer")
@Validated
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    @PostMapping
    public ResponseEntity postAnswer(@RequestBody @Valid AnswerPostDto post,
                                     @PathVariable("question-id") @Positive long questionId) {
        Answer postAnswer = answerMapper.answerPostDtoToAnswer(post);
        Answer createdAnswer = answerService.createAnswer(postAnswer);
        URI location = Uri.createUri("/question/"+ Long.toString(questionId) +"/answer/", Long.toString(createdAnswer.getAnswerId()));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @PathVariable("question-id") @Positive long questionId,
                                      @RequestBody @Valid AnswerPatchDto patch) {
        Answer answer = answerMapper.answerPatchDtoToAnswer(patch);
        answer.setAnswerId(answerId);
        Answer updated = answerService.updateAnswer(answer);
        return new ResponseEntity(answerMapper.answerToAnswerRespDto(updated), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswer(@PathVariable("question-id") @Positive long questionId) {
        List<AnswerRespDto> response = List.of(AnswerRespDto.builder()
                .answerId(1L).voteCount(1L).content("test").questionId(1L).userId(1L).createdAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).modifiedAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).build());

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId,
                                       @PathVariable("question-id") @Positive long questionId) {
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{answer-id}/comments")
    public ResponseEntity postComment(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @RequestBody @Valid CommentPostDto post) {
        AnswerComment postComment = answerMapper.commentPostDtoToAnswerComment(post);
        AnswerComment createdAnswer = answerService.postComment(postComment);
        URI location = Uri.createUri("/question/"+ Long.toString(questionId) +"/answer/"+Long.toString(answerId)
                +"/comments/", Long.toString(createdAnswer.getAnswerCommentId()));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}/{answer-comment-id}")
    public ResponseEntity patchComment(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") @Positive long answerId,
                                       @PathVariable("answer-comment-id") @Positive long answerCommentId,
                                       @RequestBody @Valid CommentPatchDto patch) {
        AnswerComment comment = answerMapper.commentPatchDtoToAnswerComment(patch);
        comment.setAnswerCommentId(answerCommentId);
        AnswerComment updated = answerService.patchComment(comment);
        return new ResponseEntity(answerMapper.commentToAnswerCommentRespDto(updated), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}/{answer-comment-id}")
    public ResponseEntity deleteComment(@PathVariable("answer-id") @Positive long answerId,
                                        @PathVariable("question-id") @Positive long questionId,
                                        @PathVariable("answer-comment-id") @Positive long answerCommentId) {
        answerService.deleteComment(answerCommentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{answer-id}/comment")
    public ResponseEntity getComment(@PathVariable("question-id") @Positive long questionId) {
        List<CommentRespDto> response = List.of(CommentRespDto.builder()
                .answerCommentId(1L).answerId(1L).content("test").userId(1L).questionId(1L).createdAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).modifiedAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).build());

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping("vote/{answer-id}/{user-id}")
    public ResponseEntity doVote(@PathVariable("answer-id") @Positive long answerId,
                                 @PathVariable("user-id") @Positive long userId) {
//        AnswerVote createdVote = answerService.doVote();
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("vote/{answer-id}/{user-id}")
    public ResponseEntity undoVote(@PathVariable("answer-id") @Positive long answerId,
                                   @PathVariable("user-id") @Positive long userId) {
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}