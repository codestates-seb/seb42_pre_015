package preproject.underdog.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.underdog.dto.PageDto;
import preproject.underdog.dto.VoteDto;
import preproject.underdog.question.dto.comment.QuestionCommentPatchDto;
import preproject.underdog.question.dto.comment.QuestionCommentPostDto;
import preproject.underdog.question.dto.question.QuestionPatchDto;
import preproject.underdog.question.dto.question.QuestionPostDto;
import preproject.underdog.question.dto.question.QuestionResponseDto;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;
import preproject.underdog.question.mapper.QuestionMapper;
import preproject.underdog.question.repository.QuestionRepo;
import preproject.underdog.question.service.QuestionService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/question")
@Validated //Question 관련 컨트롤러 메서드
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final QuestionRepo repo;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto) {
        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
        Question createQuestion = questionService.createQuestion(question);
        QuestionResponseDto responseDto = mapper.questionToQuestionResponseDto(createQuestion);
        return new ResponseEntity(responseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {
        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
        question.setQuestionId(questionId);
        Question editedQuestion = questionService.editQuestion(question);
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
        List<QuestionComment> questionCommentList = questionService.createQuestionComment(questionComment, questionId);
        return new ResponseEntity(mapper.commentsToResponseDto(questionCommentList), HttpStatus.OK);
    }

    @PatchMapping("/{question-id}/comment/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("comment-id") @Positive long commentId,
                                       @RequestBody QuestionCommentPatchDto questionPatchDto) {
        QuestionComment questionComment = mapper.commentPatchDtoToQuestionComment(questionPatchDto);
        List<QuestionComment> questionCommentList = questionService.editQuestionComment(questionComment, questionId, commentId);
        return new ResponseEntity(mapper.commentsToResponseDto(questionCommentList), HttpStatus.OK);
    }

    @GetMapping("/{question-id}/comments") // 질문글 코멘트 정렬은 프론트에서
    public ResponseEntity getComments(@PathVariable("question-id") long questionId) {
        List<QuestionComment> comments = questionService.getQuestionComments(questionId);
        return new ResponseEntity(mapper.commentsToResponseDto(comments), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/comment/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("question-id") long questionId,
                                         @PathVariable("comment-id") long commentId){
        List<QuestionComment> questionCommentList = questionService.deleteQuestionComment(questionId, commentId);
        return new ResponseEntity(mapper.commentsToResponseDto(questionCommentList), HttpStatus.OK);
    }

    //vote 기능 메서드
    @PostMapping("/{question-id}/vote") // 엔드포인트 수정됨
    public ResponseEntity postVote(@PathVariable("question-id") long questionId){
        Question question = questionService.createVote(questionId);
        return new ResponseEntity(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    @GetMapping("/{question-id}/vote")
    public ResponseEntity getVote(@PathVariable("question-id") long questionId){
        VoteDto.Question voteDto = questionService.getVote(questionId);
        return new ResponseEntity(voteDto, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/vote") // 엔드포인트 수정됨
    public ResponseEntity deleteVote(@PathVariable("question-id") long questionId){
        Question question = questionService.cancelVote(questionId);
        return new ResponseEntity(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchQuestions(@RequestParam(required = false) String title,
                                          @RequestParam(required = false) String name,
                                          @RequestParam(required = false) Integer answerCount,
                                          @RequestParam(required = false) ArrayList<String> tags,
                                          Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() -1 , pageable.getPageSize(), pageable.getSort());
        Page<Question> questionPage = repo.findAll(pageRequest);
        List<Question> questions = questionPage.getContent();
        if (tags != null) {
            for(String tag : tags) {
                questions = questions.stream()
                        .filter(q -> q.getTags().contains(tag))
                        .collect(Collectors.toList());
            }
        }
        if (answerCount != null) {
            questions = questions.stream()
                    .filter(q -> q.getAnswerList().size() >=answerCount)
                    .collect(Collectors.toList());
        }
        if (title != null) {
            questions = questions.stream()
                    .filter(q -> q.getTitle().contains(title))
                    .collect(Collectors.toList());
        }
        if (name != null) {
            questions = questions.stream()
                    .filter(q -> q.getUser().getName().contains(name))
                    .collect(Collectors.toList());
        }
        return new ResponseEntity<>(new PageDto<>(mapper.questionsToResponseDto(questions), questionPage), HttpStatus.OK);
    }
}