package preproject.underdog.question.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.underdog.dto.PageDto;
import preproject.underdog.question.dto.comment.QuestionCommentPostDto;
import preproject.underdog.question.dto.comment.QuestionCommentResponseDto;
import preproject.underdog.question.dto.question.QuestionPatchDto;
import preproject.underdog.question.dto.question.QuestionPostDto;
import preproject.underdog.question.dto.question.QuestionResponseDto;
import preproject.underdog.question.dto.tag.TagPostDto;
import preproject.underdog.question.dto.tag.TagResponseDto;
import preproject.underdog.question.entity.Question;
import preproject.underdog.utils.Uri;
import preproject.underdog.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

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
//        Question question = new Question();
//        Question question =
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, 1l);

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {

        QuestionResponseDto response = new QuestionResponseDto(1L, 1L, "title", "content",
                1, 1, LocalDateTime.of(2023, 4, 3, 3, 3, 0),
                LocalDateTime.of(2023, 4, 3, 3, 3, 0));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(Pageable pageable) {
        List<QuestionResponseDto> response = List.of(QuestionResponseDto.builder()
                .questionId(1L).voteCount(1).viewCount(1).content("test").title("dd").questionId(1L).userId(1L)
                .createdAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0))
                .modifiedAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).build());

        Page<Question> questionPage = new PageImpl<>(List.of(new Question()));

        return new ResponseEntity<>(new PageDto<>(response, questionPage), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId) {
        QuestionResponseDto response = new QuestionResponseDto(1L, 1L, "ss", "dd", 1, 1,
                LocalDateTime.of(2023, 4, 3, 3, 3, 0),
                LocalDateTime.of(2023, 4, 3, 3, 3, 1));

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
        URI location = Uri.createUri("/question/"+ Long.toString(questionId) +"/comment/", Long.toString(1L));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}/comment/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("comment-id") @Positive long commentId,
                                       @RequestBody QuestionPatchDto questionPatchDto) {

        QuestionCommentResponseDto response = new QuestionCommentResponseDto(1L, 1L, 1L, "content",
                LocalDateTime.of(2023, 4, 3, 3, 3, 0),
                LocalDateTime.of(2023, 4, 3, 3, 3, 1));
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/{question-id}/comment")
    public ResponseEntity getComments(@PathVariable("question-id") long questionId) {
        List<QuestionCommentResponseDto> response = List.of(QuestionCommentResponseDto.builder()
                .questionId(1L).content("test").userId(1L)
                .createdAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0))
                .modifiedAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).questionCommentId(1l).build());
//        List<Comment> comments = commentService.getCommentsByQuestionId(questionId);
//        return comments.stream().map(CommentDto::new).collect(Collectors.toList());
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/comment/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("question-id") long questionId,
                                         @PathVariable("comment-id") long commentId){
        return new ResponseEntity(HttpStatus.NO_CONTENT);
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
                                  @Valid @RequestBody TagPostDto tagPostDto) {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{question-id}/tag")
    public ResponseEntity getQuestionTags(@PathVariable("question-id") long questionId) {
        List<TagResponseDto> response = List.of(TagResponseDto.builder()
                .questionId(1L).tagId(1L).tagName("dd").build());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}