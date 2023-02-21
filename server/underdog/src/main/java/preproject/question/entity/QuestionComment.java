package preproject.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.audit.Auditable;

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

}
