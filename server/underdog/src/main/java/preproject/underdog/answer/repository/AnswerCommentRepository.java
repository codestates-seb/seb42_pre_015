package preproject.underdog.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;

@Repository
public interface AnswerCommentRepository extends JpaRepository<AnswerComment, Long> {
    void deleteAllByAnswer(Answer answer);
}
