package preproject.underdog.question.entity;

import preproject.underdog.auditing.Auditable;
import preproject.underdog.tag.entity.Tag;

import javax.persistence.*;

@Entity
public class QuestionTag extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionTagId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

}
