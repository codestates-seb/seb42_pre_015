package preproject.underdog.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.underdog.tag.entity.Tag;

public interface TagRepo extends JpaRepository<Tag, Long> {
}
