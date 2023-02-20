package preproject.underdog.answer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.repository.AnswerRepository;
import preproject.underdog.exception.BusinessLogicException;
import preproject.underdog.exception.ExceptionCode;

import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
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

    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }
}
