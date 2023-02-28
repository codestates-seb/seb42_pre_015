package preproject.underdog.question.spec;

import org.springframework.data.jpa.domain.Specification;
import preproject.underdog.question.entity.Question;

public class QuestionSpec {
    public static Specification<Question> equalTitle(String title) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("title"), "%" + title + "%");
    }

    public static Specification<Question> equalName(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("name"), name);
    }

//    public static Specification<Question> equalAnswerCount(Integer answerCount) {
//        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("answerCount"), answerCount);
//    }

//    public static Specification<Question> equalTeam(Team team) {
//        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("team"), team);
//    }
//
}
