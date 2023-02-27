package preproject.underdog.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.entity.AnswerVote;
import preproject.underdog.answer.repository.AnswerCommentRepository;
import preproject.underdog.answer.repository.AnswerRepository;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ExceptionCode;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.service.QuestionService;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.repository.UserRepository;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final AnswerCommentRepository answerCommentRepository;
    private final QuestionService questionService;
    private final UserRepository userRepository;

    public List<Answer> createAnswer(Answer answer, Long questionId) {
        Question question = questionService.findQuestionById(questionId);

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_CREATING_POST));

        answer.setUser(user);
        answer.setQuestion(question);
        answerRepository.save(answer);

        return answerRepository.findByQuestionId(question.getQuestionId());
    }

    public List<Answer> updateAnswer(Answer answer, long questionId) {
        Question question = questionService.findQuestionById(questionId);
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!findAnswer.getUser().getEmail().equals(principal)) throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);

        if(!question.getAnswerList().contains(findAnswer)) throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);

        findAnswer.setContent(answer.getContent());
        answerRepository.save(findAnswer);
        return answerRepository.findByQuestionId(question.getQuestionId());
    }

    public List<Answer> getAnswer(long questionId) {
        List<Answer> answer = answerRepository.findByQuestionId(questionId);
        return answer;
    }

    public List<Answer> deleteAnswer(long questionId, long answerId) {
        Question question = questionService.findQuestionById(questionId);
        Answer answer = findVerifiedAnswer(answerId);

        // 답변 작성자가 맞는지 검증 -> 시큐리티
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!answer.getUser().getEmail().equals(principal)) throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_POST);

        if(!question.getAnswerList().contains(answer)) throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);

        answerRepository.deleteAllByIdInBatch(Collections.singleton(answer.getAnswerId()));
        return answerRepository.findByQuestionId(question.getQuestionId());
    }

    public List<AnswerComment> postComment(AnswerComment comment, long questionId, long answerId) {
        Question question = questionService.findQuestionById(questionId);//질문 검증
        Answer verifyAnswer = findVerifiedAnswer(answerId);//답변 검증
        if(!question.getAnswerList().contains(verifyAnswer)) throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);

        //유저 검증
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_CREATING_POST));

        comment.setAnswer(verifyAnswer);
        comment.setUser(user);

        answerCommentRepository.save(comment);
        return answerRepository.findByAnswerId(answerId);
    }

    public List<AnswerComment> patchComment(AnswerComment comment, long questionId, long answerId, long answerCommentId){
        Question question = questionService.findQuestionById(questionId);
        Answer answer = findVerifiedAnswer(answerId);
        AnswerComment verifyComment = findVerifiedComment(answerCommentId);

        if(!(question.getAnswerList().contains(answer) && answer.getComments().contains(verifyComment))) {
            throw new BusinessLogicException(ExceptionCode.ID_IS_NOT_THE_SAME);
        }

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!verifyComment.getUser().getEmail().equals(principal)) throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);

        verifyComment.setContent(comment.getContent());
        answerCommentRepository.save(verifyComment);
        return answerRepository.findByAnswerId(answer.getAnswerId());
    }

    public List<AnswerComment> getComment(long answerId, long questionId) {
        Question question = questionService.findQuestionById(questionId);
        Answer answer = findVerifiedAnswer(answerId);
        if(!question.getAnswerList().contains(answer))
            throw new BusinessLogicException(ExceptionCode.ANSWER_COMMENT_NOT_FOUND);

        List<AnswerComment> comment = answerRepository.findByAnswerId(answerId);
        return comment;
    }

    public List<AnswerComment> deleteComment(long answerCommentId, long questionId, long answerId) {
        Question question = questionService.findQuestionById(questionId);
        Answer answer = findVerifiedAnswer(answerId);
        AnswerComment comment = findVerifiedComment(answerCommentId);

        if(!(question.getAnswerList().contains(answer) && answer.getComments().contains(comment))) {
            throw new BusinessLogicException(ExceptionCode.ID_IS_NOT_THE_SAME);
        }

        // 댓글 작성자가 본인인지 검증 -> 시큐리티
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!comment.getUser().getEmail().equals(principal)) throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_POST);

        answerCommentRepository.deleteAllByIdInBatch(Collections.singleton(comment.getAnswerCommentId()));
        return answerRepository.findByAnswerId(answer.getAnswerId());
    }

    public Answer doVote(long questionId, long answerId) {//userId 제거
        Question question = questionService.findQuestionById(questionId);
        Answer findAnswer = findVerifiedAnswer(answerId);
        if(!question.getAnswerList().contains(findAnswer)) throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_DO_VOTE));

        try {
            answerRepository.upVote(answerId, user.getUserId());
        } catch (DataIntegrityViolationException e) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_VOTE_TWICE);
        }

        findAnswer.setVoteCount(findAnswer.getVoteCount()+1);
        return findAnswer;
    }

    public Answer undoVote(long questionId, long answerId) {//userId 제거
        Question question = questionService.findQuestionById(questionId);//질문 검증
        Answer findAnswer = findVerifiedAnswer(answerId);//답변 검증
        if(!question.getAnswerList().contains(findAnswer)) throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);

        //유저 검증
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_CANCEL_VOTE));

        AnswerVote answerVote = findAnswer.getVotes().stream()
                .filter(v -> v.getUser() == user)
                .findFirst()
                .orElseThrow(() ->new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND)); // ExceptionCode.VOTE_NOT_FOUND

        if(findAnswer.getVotes().contains(answerVote)) {
            answerRepository.downVote(answerId, user.getUserId());
            findAnswer.setVoteCount(findAnswer.getVoteCount() - 1);
        }
        else throw new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND);
        return findAnswer;
    }

    public Answer findVerifiedAnswer(long answerId) {

        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);//optionalAnswer를 레포에서 answerId로 조회
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->//findAnswer=optionalAnswer -> 반환/ 아니면 에러반환
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }

    public AnswerComment findVerifiedComment(long answerCommentId) {

        Optional<AnswerComment> optionalAnswer = answerCommentRepository.findById(answerCommentId);
        AnswerComment findComment =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_COMMENT_NOT_FOUND));

        return findComment;
    }
}