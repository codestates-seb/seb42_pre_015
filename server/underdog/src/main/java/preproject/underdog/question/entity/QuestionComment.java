package preproject.underdog.question.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.auditing.Auditable;
import preproject.underdog.user.entity.User;

import javax.persistence.*;
import javax.persistence.criteria.Fetch;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuestionComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionCommentId;
    @Column(columnDefinition="TEXT")
    private String content;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void setUser(User user) {
        this.user = user;
        if (!user.getQuestionCommentList().contains(this)) {
            user.getQuestionCommentList().add(this);
        }
    }

    public void setQuestion(Question question) {
        this.question = question;
        if (!question.getQuestionCommentList().contains(this)) {
            question.getQuestionCommentList().add(this);
        }
    }
}
