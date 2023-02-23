package preproject.underdog.question.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
