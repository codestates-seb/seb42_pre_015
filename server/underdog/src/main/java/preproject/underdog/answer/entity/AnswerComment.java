package preproject.underdog.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import preproject.underdog.auditing.BaseTimeEntity;
import preproject.underdog.user.entity.User;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class AnswerComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerCommentId;

    @ManyToOne
    @JoinColumn(name = "user-id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "answer-id")
    private Answer answer;

    @Nullable
    private String content;
}
