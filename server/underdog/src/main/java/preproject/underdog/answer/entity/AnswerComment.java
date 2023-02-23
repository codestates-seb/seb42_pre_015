package preproject.underdog.answer.entity;

import lombok.AllArgsConstructor;
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
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;
    @Nullable
    private String content;

    public void setUser(User user) {//User 양방향 매핑 메소드
        this.user = user;
        if (!user.getAnswerCommentList().contains(this)) {
            user.getAnswerCommentList().add(this);
        }
    }

    public void setAnswer(Answer answer) {//Answer 양방향 매핑 메소드
        this.answer = answer;
        if (!answer.getComments().contains(this)) {
            answer.getComments().add(this);
        }
    }
}
