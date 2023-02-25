package preproject.underdog.answer.service;

import lombok.RequiredArgsConstructor;
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
import preproject.underdog.question.repository.QuestionRepo;
import preproject.underdog.question.service.QuestionService;
import preproject.underdog.user.entity.User;
import preproject.underdog.user.repository.UserRepository;
import preproject.underdog.user.service.UserService;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final AnswerCommentRepository answerCommentRepository;
    private final QuestionService questionService;
    private final UserService userService;
    private final UserRepository userRepository;


    public List<Answer> createAnswer(Answer answer, Long questionId) {
        Question question = questionService.findQuestionById(questionId);
        userService.verifyUser(answer.getUser().getUserId());
        answer.setQuestion(question);
        answerRepository.save(answer);

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("회원만 답변 작성 가능합니다."));
        answer.setUser(user);

        return answerRepository.findByQuestionId(question.getQuestionId());
    }

    public List<Answer> updateAnswer(Answer answer, long questionId) {
        Question question = questionService.findQuestionById(questionId);
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!findAnswer.getUser().getEmail().equals(principal)) new RuntimeException("답변 작성자만 수정 가능합니다.");

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
        if(!answer.getUser().getEmail().equals(principal)) new RuntimeException("답변 작성자만 삭제 가능합니다.");

        answerRepository.deleteById(answerId);
        return answerRepository.findByQuestionId(question.getQuestionId());
    }

    public List<AnswerComment> postComment(AnswerComment comment, long questionId, long answerId) {
        questionService.findQuestionById(questionId);//질문 검증
        Answer verifyAnswer = findVerifiedAnswer(answerId);//답변 검증
        comment.setAnswer(verifyAnswer);
        //유저 검증
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("회원만 댓글 작성 가능합니다."));

        answerCommentRepository.save(comment);
        return answerRepository.findByAnswerId(answerId);
    }

    public List<AnswerComment> patchComment(AnswerComment comment, long questionId, long answerId, long answerCommentId){
        questionService.findQuestionById(questionId);
        Answer answer = findVerifiedAnswer(answerId);
        AnswerComment verifyComment = findVerifiedComment(comment.getAnswerCommentId());
        // 댓글 작성자가 본인인지 검증 -> 시큐리티

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!verifyComment.getUser().getEmail().equals(principal)) new RuntimeException("댓글 작성자만 수정 가능합니다.");

//        //댓글이 해당 답변에 해당되는지 검증 -> 필요한가?? 얘기해봐야할듯
//        AnswerComment findComment = answer.getComments().stream()
//                .filter(d -> d.getAnswerCommentId() == answerCommentId)
//                .findFirst()
//                .orElseThrow(RuntimeException::new);

        verifyComment.setContent(comment.getContent());
        answerCommentRepository.save(verifyComment);
        return answerRepository.findByAnswerId(answer.getAnswerId());
    }

    public List<AnswerComment> getComment(long answerId, long questionId) {
        questionService.findQuestionById(questionId);
        Answer findAnswer = findVerifiedAnswer(answerId);
        List<AnswerComment> comment = answerRepository.findByAnswerId(answerId);
        return comment;
    }

    public List<AnswerComment> deleteComment(long answerCommentId, long questionId, long answerId) {
        questionService.findQuestionById(questionId);
        Answer answer = findVerifiedAnswer(answerId);
        AnswerComment comment = findVerifiedComment(answerCommentId);
        // 댓글 작성자가 본인인지 검증 -> 시큐리티

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!comment.getUser().getEmail().equals(principal)) new RuntimeException("댓글 작성자만 삭제 가능합니다.");

        answerCommentRepository.delete(comment);
        return answerRepository.findByAnswerId(answer.getAnswerId());
    }

    public void doVote(long questionId, long answerId) {//userId 제거
        questionService.findQuestionById(questionId);
        Answer findAnswer = findVerifiedAnswer(answerId);

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("회원만 좋아요 가능합니다."));

        answerRepository.upVote(answerId, user.getUserId());
        findAnswer.setVoteCount(findAnswer.getVoteCount()+1);
    }

    public void undoVote(long questionId, long answerId) {//userId 제거
        questionService.findQuestionById(questionId);//질문 검증
        Answer findAnswer = findVerifiedAnswer(answerId);//답변 검증
        //유저 검증
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("회원만 좋아요 취소 가능합니다."));

        AnswerVote answerVote = findAnswer.getVotes().stream()
                .filter(v -> v.getUser() == user)
                .findFirst()
                .orElseThrow(RuntimeException::new);

        if(findAnswer.getVotes().contains(answerVote)) {
            answerRepository.downVote(answerId, user.getUserId());
            findAnswer.setVoteCount(findAnswer.getVoteCount() - 1);
            answerRepository.save(findAnswer);
        }
        else throw new RuntimeException("취소할 좋아요가 없습니다.");
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
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }
}