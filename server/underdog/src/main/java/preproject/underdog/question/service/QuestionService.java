package preproject.underdog.question.service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import preproject.underdog.dto.VoteDto;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ExceptionCode;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;
import preproject.underdog.question.entity.QuestionVote;
import preproject.underdog.question.repository.QuestionCommentRepo;
import preproject.underdog.question.repository.QuestionRepo;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {
    private final QuestionRepo questionRepository;
    private final QuestionCommentRepo questionCommentRepo;
    private final UserRepository userRepository;

    public Question createQuestion(Question question) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_CREATING_POST));
        question.setUser(user);
        return questionRepository.save(question);
    }

    public Question editQuestion(Question question) {
        Question findQuestion = findQuestionById(question.getQuestionId());

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!findQuestion.getUser().getEmail().equals(principal))
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);

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
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!findQuestion.getUser().getEmail().equals(principal))
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_POST);
        questionRepository.deleteById(questionId);
    }

    public List<QuestionComment> createQuestionComment(QuestionComment comment, long questionId) {
        Question foundQuestion = findQuestionById(questionId); // 질문이 있는지 검증
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_CREATING_POST));

        comment.setQuestion(foundQuestion);
        comment.setUser(user);
        foundQuestion.getQuestionCommentList().add(comment);
        questionCommentRepo.save(comment);

        return questionCommentRepo.findByQuestionId(foundQuestion.getQuestionId());
    }

    public List<QuestionComment> editQuestionComment(QuestionComment comment, long questionId, long commentId) {
        Question findQuestion = findQuestionById(questionId);
        QuestionComment verifiedComment = findVerifiedComment(commentId);

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!verifiedComment.getUser().getEmail().equals(principal)) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);
        }

        //질문에 해당 코멘트가 종속된 관계가 맞는지 확인
        QuestionComment findComment = findQuestion.getQuestionCommentList().stream()
                .filter(d -> d.getQuestionCommentId() == commentId)
                .findFirst()
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ID_IS_NOT_THE_SAME)); // questionId or commentId가 일치하지 않습니다. bad request

        findComment.setContent(comment.getContent());
        questionCommentRepo.save(findComment);

        return questionCommentRepo.findByQuestionId(findQuestion.getQuestionId());
    }

    public List<QuestionComment> getQuestionComments(long questionId) {
        Question question = findQuestionById(questionId);
        return questionCommentRepo.findByQuestionId(question.getQuestionId());
    }

    public List<QuestionComment> deleteQuestionComment(long questionId, long commentId) {
        Question findQuestion = findQuestionById(questionId);
        QuestionComment verifiedComment = findVerifiedComment(commentId);

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!verifiedComment.getUser().getEmail().equals(principal))
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_POST);

        //질문에 해당 코멘트가 종속된 관계가 맞는지 확인
        findQuestion.getQuestionCommentList().stream()
                .filter(d -> d.getQuestionCommentId() == commentId)
                .findFirst()
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ID_IS_NOT_THE_SAME));  // questionId or commentId가 일치하지 않습니다. bad request

        questionCommentRepo.deleteAllByIdInBatch(Collections.singleton(verifiedComment.getQuestionCommentId()));
        return questionCommentRepo.findByQuestionId(findQuestion.getQuestionId());
    }

    public Question createVote(long questionId) { // userId 없애도 됨.
        Question findQuestion = findQuestionById(questionId);

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_DO_VOTE));

        for (QuestionVote questionVote : user.getQuestionVoteList()) {
            if (questionVote.getQuestion().getQuestionId() == findQuestion.getQuestionId()) {
                throw new BusinessLogicException(ExceptionCode.CANNOT_VOTE_TWICE);
            }
        }

        questionRepository.upVote(questionId, user.getUserId());
        Question question = findQuestionById(questionId);

        return question;
    }

    public VoteDto.Question getVote(long questionId){
        VoteDto.Question voteDto = new VoteDto.Question();
        Question findQuestion = findQuestionById(questionId);

        voteDto.setQuestionId(findQuestion.getQuestionId());

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);

        if(optionalUser.isPresent()) {
            voteDto.setUserId(optionalUser.get().getUserId());
            if(findQuestion.getQuestionVoteList().stream()
                    .filter(v->v.getUser().getUserId()==optionalUser.get().getUserId())
                    .findFirst().isPresent()) {voteDto.setUserVote(true);}
        }

        voteDto.setVoteCount(findQuestion.getQuestionVoteList().size());

        return voteDto;
    }

    public Question cancelVote(long questionId) {
        Question findQuestion = findQuestionById(questionId);

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_CANCEL_VOTE));

        QuestionVote questionVote = findQuestion.getQuestionVoteList().stream()
                .filter(v -> v.getUser() == user)
                .findFirst()
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND)); // 좋아요 했던 사람만 취소 가능. bad request

        questionRepository.downVote(questionId, user.getUserId());
        Question question = findQuestionById(questionId);

        return question;
    }

    public Question findQuestionById(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return question;
    }

    public QuestionComment findVerifiedComment(long questionCommentId) {

        Optional<QuestionComment> optionalQuestionComment = questionCommentRepo.findById(questionCommentId);
        QuestionComment findComment =
                optionalQuestionComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_COMMENT_NOT_FOUND));

        return findComment;
    }
}
