package preproject.underdog.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.question.entity.QuestionComment;

import java.util.List;
import java.util.Optional;

public interface QuestionCommentRepo extends JpaRepository<QuestionComment, Long> {
    @Override
    List<QuestionComment> findAll();

    @Query(value = "SELECT * FROM question_comment WHERE question_id = :questionId", nativeQuery = true)
    List<QuestionComment> findByQuestionId(long questionId);
}
