package preproject.underdog.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import preproject.underdog.answer.entity.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
}