package preproject.underdog.answer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.user.entity.User;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Modifying
    @Query(value = "INSERT INTO answer_vote (answer_id, user_id) SELECT :answerId, :userId " +
            "from dual WHERE NOT EXISTS (SELECT answer_id, user_id FROM answer_vote WHERE answer_id = :answerId and user_id = :userId)", nativeQuery = true)
    int upVote(long answerId, long userId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(value = "DELETE FROM answer_vote WHERE answer_id = :answerId AND user_id = :userId", nativeQuery = true)
    int downVote(long answerId, long userId);

    @Query(value = "SELECT * FROM answer WHERE question_id = :questionId", nativeQuery = true)
    List<Answer> findByQuestionId(long questionId);

    @Query(value = "SELECT c FROM AnswerComment c WHERE c.answer.answerId = :answerId")
    List<AnswerComment> findByAnswerId(long answerId);
}