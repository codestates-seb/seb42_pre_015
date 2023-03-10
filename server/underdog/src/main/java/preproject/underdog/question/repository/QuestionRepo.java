package preproject.underdog.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionVote;

import java.util.List;
import java.util.Optional;

public interface QuestionRepo extends JpaRepository<Question, Long>{
    @Override
    Optional<Question> findById(Long questionId);

    @Modifying
    @Query(value = "INSERT IGNORE INTO question_vote (question_id, user_id) SELECT :questionId, :userId " +
            "from dual WHERE NOT EXISTS (SELECT question_id, user_id FROM question_vote WHERE question_id = :questionId and user_id = :userId)", nativeQuery = true)
    int upVote(long questionId, long userId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(value = "DELETE FROM question_vote WHERE question_id = :questionId AND user_id = :userId", nativeQuery = true)
    int downVote(long questionId, long userId);
}
