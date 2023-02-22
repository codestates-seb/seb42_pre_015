package preproject.underdog.question.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.auditing.Auditable;
import preproject.underdog.tag.entity.Tag;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "QUESTION")
@AllArgsConstructor
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    private int viewCount;
    @OneToMany
    private List<QuestionComment> comment = new ArrayList<>();
    @OneToMany
    private List<QuestionVote> votes = new ArrayList<>();
    @OneToMany(mappedBy = "tagName", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Tag> tags = new HashSet<>();
    @OneToMany
    private List<Answer> answerList = new ArrayList<>();

    public void setAnswer(Answer answer) {
            this.getAnswerList().add(answer);
            if (answer.getQuestion() != this) {
                answer.setQuestion(this);
            }
    }
}
