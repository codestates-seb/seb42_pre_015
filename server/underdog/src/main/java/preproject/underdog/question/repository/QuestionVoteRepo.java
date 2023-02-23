package preproject.underdog.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.underdog.question.entity.QuestionVote;

import java.util.Optional;

public interface QuestionVoteRepo extends JpaRepository<QuestionVote, Long> {
    Optional<QuestionVote> findByQuestionIdAndUserId(long questionId, long userId);
}
