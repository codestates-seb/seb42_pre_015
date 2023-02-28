package preproject.underdog.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import preproject.underdog.question.entity.QuestionVote;

import java.util.Optional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {

    @Query(value = "SELECT v FROM QuestionVote v WHERE v.question.questionId = :questionId AND v.user.userId = :userId")
    Optional<QuestionVote> findByUserAndQuestion(long questionId, long userId);
}
