package preproject.underdog.question.service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ExceptionCode;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;
import preproject.underdog.question.entity.QuestionVote;
import preproject.underdog.question.repository.QuestionCommentRepo;
import preproject.underdog.question.repository.QuestionRepo;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.service.UserService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {
    private final QuestionRepo questionRepository;
    private final QuestionCommentRepo questionCommentRepo;
    private final UserService userService;

    public Question createQuestion(Question question) {
        //회원인지 검증 로직 추가
        return questionRepository.save(question);
    }

    public Question editQuestion(Question question) {
        Question findQuestion = findQuestionById(question.getQuestionId());
        // 작성자 검증 로직 추가

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));
        Optional.ofNullable(question.getTags())
                .ifPresent(tags -> findQuestion.setTags(tags));

        return questionRepository.save(findQuestion);
    }

    public Question getQuestion(long questionId) { //질문글 조회 및 조회수 증가
        Question question = findQuestionById(questionId);
        question.setViewCount(question.getViewCount() + 1);
        return question;
    }

    public Page<Question> getQuestions(Pageable pageable) { //질문글 전체 조회
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        return questionRepository.findAll(pageRequest);
    }

    public void deleteQuestion(long questionId) { //질문글 삭제
        Question findQuestion = findQuestionById(questionId);
        // 작성자 검증 로직 추가
        questionRepository.deleteById(questionId);
    }

    public List<QuestionComment> createQuestionComment(QuestionComment comment, long questionId) {
        Question foundQuestion = findQuestionById(questionId); // 질문이 있는지 검증
        User foundUser = userService.verifyUser(comment.getUser().getUserId()); // -> 회원인지 시큐리티로 검증

        comment.setQuestion(foundQuestion);
        comment.setUser(foundUser);
        foundQuestion.getQuestionCommentList().add(comment);
        questionCommentRepo.save(comment);

        return questionCommentRepo.findByQuestionId(foundQuestion.getQuestionId());
    }

    public List<QuestionComment> editQuestionComment(QuestionComment comment, long questionId, long commentId) {
        Question findQuestion = findQuestionById(questionId);
        findVerifiedComment(commentId);
        // 작성자 검증 로직 추가

        QuestionComment findComment = findQuestion.getQuestionCommentList().stream()
                .filter(d -> d.getQuestionCommentId() == commentId)
                .findFirst()
                .orElseThrow(RuntimeException::new);

        findComment.setContent(comment.getContent());
        questionCommentRepo.save(findComment);

        return questionCommentRepo.findByQuestionId(findQuestion.getQuestionId());
    }

    public List<QuestionComment> getQuestionComments(long questionId) {
        Question question = findQuestionById(questionId);
        return questionCommentRepo.findByQuestionId(question.getQuestionId());
    }

    public List<QuestionComment> deleteQuestionComment(long questionId, long commentId) {
        Question question = findQuestionById(questionId);
        findVerifiedComment(commentId);
        //작성자 확인
        questionCommentRepo.deleteById(commentId);
        return questionCommentRepo.findByQuestionId(question.getQuestionId());
    }

    public void createVote(long userId, long questionId) {
        Question findQuestion = findQuestionById(questionId);
        User findUser = userService.verifyUser(userId);
        questionRepository.upVote(questionId, userId);
        findQuestion.setVoteCount(findQuestion.getVoteCount() + 1);
    }

    public void cancelVote(long questionId, long userId) {
        Question findQuestion = findQuestionById(questionId);
        User findUser = userService.verifyUser(userId);

        QuestionVote questionVote = findQuestion.getQuestionVoteList().stream()
                .filter(v -> v.getUser() == findUser)
                .findFirst()
                .orElseThrow(RuntimeException::new);

        if(findQuestion.getQuestionVoteList().contains(questionVote)) {
            questionRepository.downVote(questionId, userId);
            findQuestion.setVoteCount(findQuestion.getVoteCount() - 1);
            questionRepository.save(findQuestion);
        }
        else throw new RuntimeException("취소할 좋아요가 없습니다.");
    }

    public Question findQuestionById(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(() -> new RuntimeException("질문 없음"));
        return question;
    }

    public QuestionComment findVerifiedComment(long questionCommentId) {

        Optional<QuestionComment> optionalQuestionComment = questionCommentRepo.findById(questionCommentId);
        QuestionComment findComment =
                optionalQuestionComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }
}
