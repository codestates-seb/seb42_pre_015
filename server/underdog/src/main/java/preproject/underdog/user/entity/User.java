package preproject.underdog.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.auditing.TimeManager;

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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column
    private String password; // OAuth 가입자의 경우, 비밀번호가 null 값임.

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

//    @OneToMany(mappedBy = "user")
//    private List<Question> questionList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<QuestionVote> questionVoteList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<QuestionComment> questionCommentList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Answer> answerList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<AnswerVote> answerVoteList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<AnswerComment> answerCommentList = new ArrayList<>();

    // 양방향 매핑 세터 추가

}
