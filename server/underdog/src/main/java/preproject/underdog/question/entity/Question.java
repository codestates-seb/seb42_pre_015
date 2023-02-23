package preproject.underdog.question.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.auditing.Auditable;
import preproject.underdog.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "question")
@AllArgsConstructor
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @Column(name = "title ", nullable = false)
    private String title;
    @Column(name = "content", nullable = false)
    private String content;
    @Column
    private int viewCount=0;
    @Column
    private int voteCount=0;
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> tags = new ArrayList<>();
    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<QuestionComment> questionCommentList = new ArrayList<>();
    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<QuestionVote> questionVoteList = new ArrayList<>();
    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<Answer> answerList = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void setQuestionComment(QuestionComment questionComment) {
        this.getQuestionCommentList().add(questionComment);
        if (questionComment.getQuestion() != this) {
            questionComment.setQuestion(this);
        }
    }

    public void setQuestionVote(QuestionVote questionVote) {
        this.getQuestionVoteList().add(questionVote);
        if (questionVote.getQuestion() != this) {
            questionVote.setQuestion(this);
        }
    }

    public void setUser(User user) {
        this.user = user;
        if (!user.getQuestionList().contains(this)) {
            user.getQuestionList().add(this);
        }
    }

    public void setAnswer(Answer answer) {
        this.getAnswerList().add(answer);
        if (answer.getQuestion() != this) {
            answer.setQuestion(this);
        }
    }
}

