package preproject.underdog.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import preproject.underdog.question.entity.Question;

import java.util.Optional;

public interface QuestionRepo extends JpaRepository<Question, Long>, JpaSpecificationExecutor<Question> {
    @Override
    Optional<Question> findById(Long questionId);
    Page<Question> findAll(Pageable pageable);
    Page<Question> findAll(Specification<Question> spec, Pageable pageable);



    @Modifying
    @Query(value = "INSERT INTO question_vote(question_id, user_id) VALUES(:questionId, :userId)", nativeQuery = true)
    int upVote(long questionId, long userId);

    @Modifying
    @Query(value = "DELETE FROM question_vote WHERE question_id = :questionId AND user_id = :userId", nativeQuery = true)
    int downVote(long questionId, long userId);
}
