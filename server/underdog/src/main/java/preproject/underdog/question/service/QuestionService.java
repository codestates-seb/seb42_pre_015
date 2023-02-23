package preproject.underdog.question.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;
import preproject.underdog.question.entity.QuestionTag;
import preproject.underdog.question.entity.QuestionVote;
import preproject.underdog.question.repository.QuestionCommentRepo;
import preproject.underdog.question.repository.QuestionRepo;
import preproject.underdog.question.repository.QuestionVoteRepo;
import preproject.underdog.question.repository.TagRepo;
import preproject.underdog.tag.entity.Tag;
import preproject.underdog.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    private final QuestionRepo questionRepository;
    private final QuestionCommentRepo questionCommentRepo;
    private final QuestionVoteRepo questionVoteRepo;
    private final TagRepo tagRepo;

    public QuestionService(QuestionRepo questionRepository, QuestionCommentRepo questionCommentRepo, QuestionVoteRepo questionVoteRepo, TagRepo tagRepo) {
        this.questionRepository = questionRepository;
        this.questionCommentRepo = questionCommentRepo;
        this.questionVoteRepo = questionVoteRepo;
        this.tagRepo = tagRepo;
    }


    public Question createQuestion(Question question) { //질문글 등록
        return questionRepository.save(question);
    }

    public Question editQuestion(Question question) { //질문글 수정
        Question findQuestion = findQuestionById(question.getQuestionId());
        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));
        findQuestion.setModifiedAt(LocalDateTime.now());

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

    public QuestionComment createQuestionComment(QuestionComment comment, long questionId) { //질문 코멘트 등록

        return questionCommentRepo.save(comment);
    }

    public QuestionComment editQuestionComment(QuestionComment comment, long questionId, long commentId) { //질문 코멘트 수정
        Question findQuestion = findQuestionById(questionId);
        QuestionComment findComment = findQuestion.getQuestionCommentList().stream()
                .filter(d -> d.getQuestionCommentId() == commentId)
                .findFirst()
                .orElseThrow(RuntimeException::new);
        findComment.setContent(comment.getContent());
        findComment.setModifiedAt(LocalDateTime.now());
        questionRepository.save(findQuestion);
        return findComment;
    }

    public List<QuestionComment> getQuestionComments(long questionId) { //질문글 전체 조회
        Question question = findQuestionById(questionId);
        return question.getQuestionCommentList();
    }

    public void deleteQuestionComment(long commentId) {
        questionCommentRepo.deleteById(commentId);
    }

    public void createVote(long userId, long questionId) {
        Question findQuestion = findQuestionById(questionId);
        findQuestion.getQuestionVoteList().stream()
                .filter(v -> v.getUser().getUserId() == userId)
                .findFirst()
                .ifPresent(l -> {
                            throw new RuntimeException();
                        }
                );
        QuestionVote questionVote = new QuestionVote();
        questionVote.setQuestion(findQuestion);
        questionVote.setUser(findQuestion.getUser());
        findQuestion.updateVoteCount();

        questionRepository.save(findQuestion);
    }

    public void cancelVote(long questionId, long userId) {
        Question findQuestion = findQuestionById(questionId);
        User user = findQuestion.getUser();
        findQuestion.getQuestionVoteList().stream()
                .filter(v -> v.getUser().getUserId() == userId)
                .findFirst()
                .orElseThrow(RuntimeException::new);
        findQuestion.setQuestionVoteList(findQuestion.getQuestionVoteList()
                .stream()
                .filter(v -> v.getUser() != user)
                .collect(Collectors.toList()));
        QuestionVote questionVote = new QuestionVote();
        questionVote.setQuestion(findQuestion);
        questionVote.setUser(user);
        findQuestion.updateVoteCount();

        questionRepository.save(findQuestion);
    }

    public Tag createTag(Tag tag) {
        return tagRepo.save(tag);
    }

    public List<QuestionTag> getQuestionTags(long questionId) {
        Question findQuestion = findQuestionById(questionId);

        return findQuestion.getQuestionTagList();
    }

    public Question findQuestionById(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(RuntimeException::new);
        return question;
    }

    public QuestionComment findQuestionComment(long questionCommentId) {
        Optional<QuestionComment> optionalQuestionComment = questionCommentRepo.findById(questionCommentId);
        QuestionComment comment = optionalQuestionComment.orElseThrow(RuntimeException::new);
        return comment;
    }
}
