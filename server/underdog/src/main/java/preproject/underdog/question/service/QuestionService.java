package preproject.underdog.question.service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
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

    public Question createQuestion(Question question) { //질문글 등록
        return questionRepository.save(question);
    }

    public Question editQuestion(Question question, Long userId) { //유저 추가
        Question findQuestion = findQuestionById(question.getQuestionId());
        userService.verifyUser(userId);

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
        questionRepository.deleteById(questionId);
    }

    public QuestionComment createQuestionComment(QuestionComment comment, long questionId) {
        Question foundQuestion = findQuestionById(questionId); // 질문이 있는지 검증
        User foundUser = userService.verifyUser(comment.getUser().getUserId());

        comment.setQuestion(foundQuestion);
        comment.setUser(foundUser);

        foundQuestion.getQuestionCommentList().add(comment);
        return questionCommentRepo.save(comment);
    }

    public QuestionComment editQuestionComment(QuestionComment comment, long questionId, long commentId, long userId) {
        Question findQuestion = findQuestionById(questionId);
        User user = userService.verifyUser(userId);

        QuestionComment findComment = findQuestion.getQuestionCommentList().stream()
                .filter(d -> d.getQuestionCommentId() == commentId)
                .findFirst()
                .orElseThrow(RuntimeException::new);

        findComment.setContent(comment.getContent());
        return questionCommentRepo.save(findComment);
    }

    public List<QuestionComment> getQuestionComments(long questionId) {
        Question question = findQuestionById(questionId);
        return question.getQuestionCommentList();
    }

    public void deleteQuestionComment(long commentId) {
        questionCommentRepo.deleteById(commentId);
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
}
