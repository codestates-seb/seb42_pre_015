package preproject.underdog.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.entity.AnswerVote;

@Repository
public interface VoteRepository extends JpaRepository<AnswerVote, Long> {
}
