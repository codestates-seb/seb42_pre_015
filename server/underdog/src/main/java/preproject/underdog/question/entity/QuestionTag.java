package preproject.underdog.question.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.auditing.Auditable;
import preproject.underdog.tag.entity.Tag;
import preproject.underdog.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionTag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionTagId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public void setQuestion(Question question) {
        this.question = question;
        if (!question.getQuestionTagList().contains(this)) {
            question.getQuestionTagList().add(this);
        }
    }

    public void setTag(Tag tag) {
        this.tag = tag;
        if (!tag.getQuestionTagList().contains(this)) {
            tag.getQuestionTagList().add(this);
        }
    }
}


