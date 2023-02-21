package preproject.question.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.question.dto.*;
import preproject.question.entity.Question;
import preproject.tag.entity.Tag;
import preproject.utils.UriCreator;
//import preproject.question.mapper.QuestionMapper;
//import preproject.question.service.QuestionService;
//import preproject.question.mapper.QuestionMapper;
//import preproject.question.service.QuestionService;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.xml.stream.events.Comment;
import java.awt.print.Pageable;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/question")
@Validated //Question 관련 컨트롤러 메서드
public class QuestionController {
   private final static String QUESTION_DEFAULT_URL = "/question";
//    private QuestionService questionService;
//    private QuestionMapper mapper;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto) {
//        Question question = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto));
////
//        Question question = new Question();
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL,1l);

        return ResponseEntity.created(location).build();

    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(Pageable pageable) {

        List<QuestionAllDto.Response> response = List.of(QuestionAllDto.Response.builder()
                .questionId(1L).voteCount(1).viewCount(1).content("test").title("dd").questionId(1L).userId(1L)
                .createdAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0))
                .modifiedAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).questionCommentId(1l).build());

        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){ List<String> tags = new ArrayList<>();
        QuestionAllDto.Response response = new QuestionAllDto.Response(1L,1L,"ss","dd",1,1,
                LocalDateTime.of(2023, 4, 3, 3, 3, 0),
                LocalDateTime.of(2023, 4, 3, 3, 3, 1),1);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId) {
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    //question 밑에 있는 comment 관련 컨트롤러 메서드
    @PostMapping("/{question-id}/comment")
    public ResponseEntity postComment(@PathVariable("question-id") @Positive long questionId,
                                      @RequestBody QuestionCommentPostDto questionCommentPostDto) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{question-id}/comment/{user-id}/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("user-id")@Positive long userId,
                                       @PathVariable("comment-id") @Positive long commentId,
                                       @RequestBody QuestionPatchDto questionPatchDto) {

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{question-id}/comment")
    public ResponseEntity getComments(@PathVariable("question-id") long questionId){
        List<QuestionCommentResponseDto> response = List.of(QuestionCommentResponseDto.builder()
                .questionId(1L).content("test").userId(1L)
                .createdAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0))
                .modifiedAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).questionCommentId(1l).build());
//        List<Comment> comments = commentService.getCommentsByQuestionId(questionId);
//        return comments.stream().map(CommentDto::new).collect(Collectors.toList());
        return new ResponseEntity(response,HttpStatus.OK);

    }

    //vote 기능 메서드
    @PostMapping("/{question-id}/vote/{user-id}")
    public ResponseEntity postVote(@PathVariable("question-id") long questionId,
                                   @PathVariable("user-id") long userId) {

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/vote/{user-id}")
    public ResponseEntity deleteVote(@PathVariable("question-id") long questionId,
                                     @PathVariable("user-id") long userId) {
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
    //tag 기능 메서드
    @PostMapping("/{question-id}/tag")
    public ResponseEntity postTag(@PathVariable("question-id") long questionId,
                                  @Valid @RequestBody TagPostDto tagPostDto){

        URI location = UriCreator.createUri("/question/{question-id}/tag", 1L);

        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/{question-id}/tag/{tag-id}")
    public ResponseEntity getQuestionTag(@PathVariable("question-id") long questionId,
                                         @PathVariable("tag-id")long tagId){
        List<TagResponseDto> response = List.of(TagResponseDto.builder()
                .questionId(1L).tagId(1L).tagName("dd").build());
        return new ResponseEntity<>(response,HttpStatus.OK);
    }


}