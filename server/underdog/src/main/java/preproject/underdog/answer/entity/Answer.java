package preproject.underdog.answer.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.auditing.BaseTimeEntity;
import preproject.underdog.question.entity.Question;
import preproject.underdog.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Answer extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false, columnDefinition="TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToMany(mappedBy = "answer")
    private List<AnswerVote> votes = new ArrayList<>();

    @OneToMany(mappedBy = "answer")
    private List<AnswerComment> comments = new ArrayList<>();

    public void setQuestion(Question question) {//Question 양방향 매핑 메소드
        this.question = question;
        if (!question.getAnswerList().contains(this)) {
            question.getAnswerList().add(this);
        }
    }

    public void setUser(User user) {//User 양방향 매핑 메소드
        this.user = user;
        if (!user.getAnswerList().contains(this)) {
            user.getAnswerList().add(this);
        }
    }

    public void setComment(AnswerComment comment) {//Comment 양방향 매핑 메소드
        this.getComments().add(comment);
        if (comment.getAnswer() != this) {
            comment.setAnswer(this);
        }
        }
    }
