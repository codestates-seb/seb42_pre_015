package preproject.underdog.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.underdog.question.entity.QuestionComment;

import java.util.List;
import java.util.Optional;

public interface QuestionCommentRepo extends JpaRepository<QuestionComment, Long> {
    @Override
    Optional<QuestionComment> findById(Long questionCommentId);
    @Override
    List<QuestionComment> findAll();
}
