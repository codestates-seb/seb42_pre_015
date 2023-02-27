package preproject.underdog.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.entity.AnswerVote;
import preproject.underdog.auditing.TimeManager;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;
import preproject.underdog.question.entity.QuestionVote;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Setter
public class User extends TimeManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column
    private String name;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column
    private String password; // OAuth 가입자의 경우, 비밀번호가 null 값임.

//    @Column
//    private String refreshToken; // 리프레시 토큰 저장

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Question> questionList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<QuestionVote> questionVoteList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<QuestionComment> questionCommentList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Answer> answerList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<AnswerVote> answerVoteList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<AnswerComment> answerCommentList = new ArrayList<>();

    public void setQuestion(Question question) {
        this.getQuestionList().add(question);
        if(question.getUser()!=this){
            question.setUser(this);
        }
    }

    public void setQuestionVote(QuestionVote questionVote) {
        this.getQuestionVoteList().add(questionVote);
        if(questionVote.getUser()!=this){
            questionVote.setUser(this);
        }
    }

    public void setQuestionComment(QuestionComment questionComment) {
        this.getQuestionCommentList().add(questionComment);
        if(questionComment.getUser()!=this){
            questionComment.setUser(this);
        }
    }

    public void setAnswer(Answer answer) {
        this.getAnswerList().add(answer);
        if(answer.getUser()!=this){
            answer.setUser(this);
        }
    }

    public void setAnswerVote(AnswerVote answerVote) {
        this.getAnswerVoteList().add(answerVote);
        if(answerVote.getUser()!=this){
            answerVote.setUser(this);
        }
    }

    public void setAnswerComment(AnswerComment answerComment) {
        this.getAnswerCommentList().add(answerComment);
        if(answerComment.getUser()!=this){
            answerComment.setUser(this);
        }
    }
}
