package preproject.question.entity;

import preproject.audit.Auditable;
import preproject.tag.entity.Tag;

import javax.persistence.*;

public class QuestionTag extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

}
