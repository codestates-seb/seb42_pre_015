package preproject.underdog.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;

@Service
public interface CommentRepository extends JpaRepository<AnswerComment, Long> {
}
