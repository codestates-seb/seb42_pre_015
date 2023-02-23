package preproject.underdog.tag.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.underdog.question.entity.QuestionTag;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
    private String tagName;
    @OneToMany(mappedBy = "tag", cascade = CascadeType.PERSIST)
    List<QuestionTag> questionTagList = new ArrayList<>();

    public void setTag(QuestionTag questionTag) {
        this.getQuestionTagList().add(questionTag);
        if (questionTag.getTag() != this) {
            questionTag.setTag(this);
        }
    }
}
