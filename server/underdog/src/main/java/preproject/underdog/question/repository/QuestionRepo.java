package preproject.underdog.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import preproject.underdog.question.entity.Question;

import java.util.Optional;

public interface QuestionRepo extends JpaRepository<Question, Long>{
    @Override
    Optional<Question> findById(Long questionId);
    Page<Question> findAll(Pageable pageable);
}
