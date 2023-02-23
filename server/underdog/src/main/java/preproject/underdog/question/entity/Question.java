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
    @Column(name = "view_count")
    @ColumnDefault("0")
    private int viewCount;
    @Column(name = "vote_count")
    @ColumnDefault("0")
    private int voteCount;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<QuestionComment> questionCommentList = new ArrayList<>();
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<QuestionVote> questionVoteList = new ArrayList<>();
    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    private List<QuestionTag> questionTagList = new ArrayList<>();
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status = Status.QUESTION_REGISTRATION;
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

    public void updateVoteCount(){
        this.voteCount = this.questionVoteList.size();
    }

    public void discountVote(QuestionVote questionVote){
        this.questionVoteList.remove(questionVote);
    }

    public void setQuestionTag(QuestionTag questionTag) {
        this.getQuestionTagList().add(questionTag);
        if (questionTag.getQuestion() != this) {
            questionTag.setQuestion(this);
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

    @Getter
    public enum Status {
        QUESTION_REGISTRATION("질문 등록"),
        QUESTION_DELETE("질문 삭제");

        final String status;

        Status(String status) {
            this.status = status;
        }
    }


}

