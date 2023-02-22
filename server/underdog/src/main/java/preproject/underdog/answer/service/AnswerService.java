package preproject.underdog.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.entity.AnswerVote;
import preproject.underdog.answer.repository.AnswerRepository;
import preproject.underdog.answer.repository.CommentRepository;
import preproject.underdog.answer.repository.VoteRepository;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ExceptionCode;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.repository.QuestionRepository;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final CommentRepository commentRepository;

    private final VoteRepository voteRepository;

    private final QuestionRepository questionRepository;

    private final UserRepository userRepository;



    @Transactional
    public Answer createAnswer(Answer answer) {
        //질문 등록자가 회원인가?? -> 시큐리티 or verify logic
        return answerRepository.save(answer);
    }

    @Transactional
    public Answer updateAnswer(Answer answer) { //답변 수정
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        return answerRepository.save(findAnswer);
    }

    @Transactional
    public void deleteAnswer(long answerId) { //답변 삭제
        Answer answer = findVerifiedAnswer(answerId);
        answerRepository.delete(answer);
    }

    public Answer getAnswer(long answerId) {

        Answer answer = new Answer();
//        Answer answer = answerRepository.findById(answerId);
        return answer;
    }

    @Transactional
    public AnswerComment postComment(AnswerComment comment) {
        return commentRepository.save(comment);
    }

    @Transactional
    public AnswerComment patchComment(AnswerComment comment){
        return commentRepository.save(comment);
    }

    public AnswerComment getComment(long answerId) {
        AnswerComment comment = new AnswerComment();
        return comment;
    }

    public void findByQId(long questionId) {
//        Answer answerWithQ = answerRepository.findById();
    }
    @Transactional
    public void doVote(long answerId, long userId) {
        return;
    }

    @Transactional
    public void undoVote(long answerId, long userId) {
        return;
    }

    @Transactional
    public void deleteComment(long answerCommentId) {
        AnswerComment comment = findVerifiedComment(answerCommentId);
        commentRepository.delete(comment);
    }


    public Answer findVerifiedAnswer(long answerId) {

        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);//optionalAnswer를 레포에서 answerId로 조회
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->//findAnswer=optionalAnswer -> 반환/ 아니면 에러반환
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }

    public AnswerComment findVerifiedComment(long answerCommentId) {

        Optional<AnswerComment> optionalAnswer = commentRepository.findById(answerCommentId);
        AnswerComment findComment =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }


}