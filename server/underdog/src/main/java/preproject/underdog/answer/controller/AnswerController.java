package preproject.underdog.answer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.comment.CommentPatchDto;
import preproject.underdog.answer.dto.comment.CommentPostDto;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.mapper.AnswerMapper;
import preproject.underdog.answer.service.AnswerService;
import preproject.underdog.utils.Uri;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/answer")
@Validated
@RequiredArgsConstructor
public class AnswerController {

    private final String DEFAULT_URI = "/answer/";
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    @PostMapping
    public ResponseEntity postAnswer(@RequestBody @Valid AnswerPostDto post) {
        Answer postAnswer = answerMapper.answerPostDtoToAnswer(post);
        Answer createdAnswer = answerService.createAnswer(postAnswer);
        URI location = Uri.createUri(DEFAULT_URI, Long.toString(createdAnswer.getAnswerId()));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @RequestBody @Valid AnswerPatchDto patch) {
        Answer answer = answerMapper.answerPatchDtoToAnswer(patch);
        answer.setAnswerId(answerId);
        Answer updated = answerService.updateAnswer(answer);
        return new ResponseEntity(answerMapper.answerToAnswerRespDto(updated), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getAnswer()

    @DeleteMapping("{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId) {
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{answer-id}/comments")
    public ResponseEntity postComment(@PathVariable("answer-id") @Positive long answerId,
                                      @RequestBody @Valid CommentPostDto post) {
        AnswerComment postComment = answerMapper.commentPostDtoToAnswerComment(post);
        AnswerComment createdAnswer = answerService.postComment(postComment);

        return new ResponseEntity<>(createdAnswer, HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}/{answer-comment-id}")
    public ResponseEntity patchComment(@PathVariable("answer-id") @Positive long answerId,
                                       @PathVariable("answer-comment-id") @Positive long answerCommentId,
                                       @RequestBody @Valid CommentPatchDto patch) {
        AnswerComment comment = answerMapper.commentPatchDtoToAnswerComment(patch);
        comment.setAnswerCommentId(answerCommentId);
        AnswerComment updated = answerService.patchComment(comment);
        return new ResponseEntity(answerMapper.commentToAnswerCommentRespDto(updated), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}/{answer-comment-id}")
    public ResponseEntity deleteComment(@PathVariable("answer-id") @Positive long answerId,
                                        @PathVariable("answer-comment-id") @Positive long answerCommentId) {
        answerService.deleteComment(answerCommentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}