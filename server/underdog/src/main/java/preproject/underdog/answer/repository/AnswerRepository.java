package preproject.underdog.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Modifying
    @Query(value = "INSERT INTO answer_vote(answer_id, user_id) VALUES(:answerId, :userId)", nativeQuery = true)
    int upVote(long answerId, long userId);

    @Modifying
    @Query(value = "DELETE FROM answer_vote WHERE answer_id = :answerId AND user_id = :userId", nativeQuery = true)
    int downVote(long answerId, long userId);

    @Query(value = "SELECT * FROM answer WHERE question_id = :questionId", nativeQuery = true)
    List<Answer> findByQuestionId(long questionId);

    @Query(value = "SELECT * FROM answer_comment WHERE answer_id = :answerId", nativeQuery = true)
    List<AnswerComment> findByAnswerId(long answerId);

}