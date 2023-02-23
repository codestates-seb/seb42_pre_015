package preproject.underdog.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;

@Repository
public interface CommentRepository extends JpaRepository<AnswerComment, Long> {
}
