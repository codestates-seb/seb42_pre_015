package preproject.underdog.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.auditing.Auditable;
import preproject.underdog.user.entity.User;

import javax.persistence.*;

@Entity(name = "QUESTION_COMMENT")
@NoArgsConstructor
@Getter
@Setter
public class QuestionComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionCommentId;
    @Column
    private String content;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
