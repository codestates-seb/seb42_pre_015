package preproject.underdog.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.repository.AnswerRepository;
import preproject.underdog.answer.repository.CommentRepository;
import preproject.underdog.answer.repository.VoteRepository;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ExceptionCode;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.repository.QuestionRepository;
import preproject.underdog.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final CommentRepository commentRepository;
    private final QuestionRepository questionRepository;




    @Transactional
    public Answer createAnswer(Answer answer) {
        //질문 등록자가 회원인가?? -> 시큐리티 or verify logic
        //질문 있는지 검증?
        return answerRepository.save(answer);
    }

    @Transactional
    public Answer updateAnswer(Answer answer) { //답변 수정
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());//답변 존재하는지 검증

        return answerRepository.save(findAnswer);
    }

    @Transactional
    public void deleteAnswer(long answerId) { //답변 삭제
        Answer answer = findVerifiedAnswer(answerId);
        answerRepository.delete(answer);
    }

    public List<Answer> getAnswer(long questionId) {
        List<Answer> answer = answerRepository.findByQuestionId(questionId);
        return answer;
    }

    @Transactional
    public AnswerComment postComment(AnswerComment comment) {
        Answer verifyAnswer = findVerifiedAnswer(comment.getAnswer().getAnswerId());
        return commentRepository.save(comment);
    }

    @Transactional
    public AnswerComment patchComment(AnswerComment comment){
        AnswerComment verifyComment = findVerifiedComment(comment.getAnswerCommentId());
        return commentRepository.save(verifyComment);
    }

    public List<AnswerComment> getComment(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        List<AnswerComment> comment = answerRepository.findByAnswerId(findAnswer.getAnswerId());
        return comment;
    }

    @Transactional
    public void deleteComment(long answerCommentId) {
        AnswerComment comment = findVerifiedComment(answerCommentId);
        commentRepository.delete(comment);
    }

    @Transactional
    public void doVote(long answerId, long userId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        answerRepository.upVote(findAnswer.getAnswerId(), userId);
    }

    @Transactional
    public void undoVote(long answerId, long userId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        answerRepository.downVote(findAnswer.getAnswerId(), userId);
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

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

}