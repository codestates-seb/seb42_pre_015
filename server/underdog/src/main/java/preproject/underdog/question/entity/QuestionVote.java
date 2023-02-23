package preproject.underdog.question.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionVote  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionVoteId;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    @ManyToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    public void setQuestion(Question question) {
        this.question = question;
        if(!question.getQuestionVoteList().contains(this)) {
            question.getQuestionVoteList().add(this);
        }
    }

    public void setUser(User user) {
        this.user = user;
        if(!user.getQuestionVoteList().contains(this)){
            user.getQuestionVoteList().add(this);
        }
    }
}