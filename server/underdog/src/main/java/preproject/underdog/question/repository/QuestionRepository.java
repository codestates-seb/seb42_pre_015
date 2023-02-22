package preproject.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.underdog.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long>{

}
