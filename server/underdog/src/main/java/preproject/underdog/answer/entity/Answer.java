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

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "user-id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "question-id")
    private Question question;

    @OneToMany(mappedBy = "answer")
    private List<AnswerVote> votes = new ArrayList<>();

    @OneToMany(mappedBy = "answer")
    private List<AnswerComment> comments = new ArrayList<>();

//    private String answerImageURL;
}
