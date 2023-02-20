package preproject.underdog.answer.service;

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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final CommentRepository commentRepository;

    private final VoteRepository voteRepository;

    public AnswerService(AnswerRepository answerRepository, CommentRepository commentRepository, VoteRepository voteRepository) {
        this.answerRepository = answerRepository;
        this.commentRepository = commentRepository;
        this.voteRepository = voteRepository;
    }

    @Transactional
    public Answer createAnswer(Answer answer) { //답변 작성
        return answerRepository.save(answer);
    }

    @Transactional
    public Answer updateAnswer(Answer answer) { //답변 수정
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        return answerRepository.save(answer);
    }

    @Transactional
    public void deleteAnswer(long answerId) { //답변 삭제
        Answer answer = findVerifiedAnswer(answerId);
        answerRepository.delete(answer);
    }

    public Answer getAnswer(long answerId) {
        Answer answer = new Answer();
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

    @Transactional
    public AnswerVote doVote(AnswerVote vote) {
        return voteRepository.save(vote);
    }

    @Transactional
    public void undoVote(long answerVoteId) {
        return;
    }

    @Transactional
    public void deleteComment(long answerCommentId) {
        AnswerComment comment = findVerifiedComment(answerCommentId);
        commentRepository.delete(comment);
    }


    public Answer findVerifiedAnswer(long answerId) {

        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
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