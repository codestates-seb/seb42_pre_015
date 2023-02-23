package preproject.underdog.question.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import preproject.underdog.question.dto.comment.QuestionCommentPatchDto;
import preproject.underdog.question.dto.comment.QuestionCommentPostDto;
import preproject.underdog.question.dto.comment.QuestionCommentResponseDto;
import preproject.underdog.question.dto.comment.QuestionCommentResponseDto.QuestionCommentResponseDtoBuilder;
import preproject.underdog.question.dto.question.QuestionPatchDto;
import preproject.underdog.question.dto.question.QuestionPostDto;
import preproject.underdog.question.dto.question.QuestionResponseDto;
import preproject.underdog.question.dto.question.QuestionResponseDto.QuestionResponseDtoBuilder;
import preproject.underdog.question.dto.tag.TagPostDto;
import preproject.underdog.question.dto.tag.TagResponseDto;
import preproject.underdog.question.dto.tag.TagResponseDto.TagResponseDtoBuilder;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;
import preproject.underdog.tag.entity.Tag;
import preproject.underdog.user.entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-23T15:19:46+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 18 (Oracle Corporation)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionPostDtoToQuestion(QuestionPostDto questionPostDto) {
        if ( questionPostDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setUser( questionPostDtoToUser( questionPostDto ) );
        question.setTitle( questionPostDto.getTitle() );
        question.setContent( questionPostDto.getContent() );

        return question;
    }

    @Override
    public Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto) {
        if ( questionPatchDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setTitle( questionPatchDto.getTitle() );
        question.setContent( questionPatchDto.getContent() );

        return question;
    }

    @Override
    public QuestionResponseDto questionToQuestionResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDtoBuilder questionResponseDto = QuestionResponseDto.builder();

        questionResponseDto.userId( questionUserUserId( question ) );
        questionResponseDto.userName( questionUserName( question ) );
        if ( question.getQuestionId() != null ) {
            questionResponseDto.questionId( question.getQuestionId() );
        }
        questionResponseDto.title( question.getTitle() );
        questionResponseDto.content( question.getContent() );
        questionResponseDto.viewCount( question.getViewCount() );
        questionResponseDto.voteCount( question.getVoteCount() );
        questionResponseDto.createdAt( question.getCreatedAt() );
        questionResponseDto.modifiedAt( question.getModifiedAt() );

        return questionResponseDto.build();
    }

    @Override
    public QuestionComment commentPostDtoToQuestion(QuestionCommentPostDto commentPostDto) {
        if ( commentPostDto == null ) {
            return null;
        }

        QuestionComment questionComment = new QuestionComment();

        questionComment.setContent( commentPostDto.getContent() );

        return questionComment;
    }

    @Override
    public QuestionComment commentPatchDtoToQuestion(QuestionCommentPatchDto commentPatchDto) {
        if ( commentPatchDto == null ) {
            return null;
        }

        QuestionComment questionComment = new QuestionComment();

        questionComment.setContent( commentPatchDto.getContent() );

        return questionComment;
    }

    @Override
    public QuestionCommentResponseDto commentToCommentResponseDto(QuestionComment questionComment) {
        if ( questionComment == null ) {
            return null;
        }

        QuestionCommentResponseDtoBuilder questionCommentResponseDto = QuestionCommentResponseDto.builder();

        questionCommentResponseDto.userId( questionCommentUserUserId( questionComment ) );
        questionCommentResponseDto.userName( questionCommentUserName( questionComment ) );
        questionCommentResponseDto.questionCommentId( questionComment.getQuestionCommentId() );
        questionCommentResponseDto.content( questionComment.getContent() );
        questionCommentResponseDto.createdAt( questionComment.getCreatedAt() );
        questionCommentResponseDto.modifiedAt( questionComment.getModifiedAt() );

        return questionCommentResponseDto.build();
    }

    @Override
    public Tag tagPostDtoToTag(TagPostDto tagPostDto) {
        if ( tagPostDto == null ) {
            return null;
        }

        Tag tag = new Tag();

        tag.setTagName( tagPostDto.getTagName() );

        return tag;
    }

    @Override
    public TagResponseDto tagToTagResponseDto(Tag tag) {
        if ( tag == null ) {
            return null;
        }

        TagResponseDtoBuilder tagResponseDto = TagResponseDto.builder();

        if ( tag.getTagId() != null ) {
            tagResponseDto.tagId( tag.getTagId() );
        }
        tagResponseDto.tagName( tag.getTagName() );

        return tagResponseDto.build();
    }

    @Override
    public List<QuestionResponseDto> questionsToResponseDto(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<QuestionResponseDto> list = new ArrayList<QuestionResponseDto>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToQuestionResponseDto( question ) );
        }

        return list;
    }

    @Override
    public List<QuestionCommentResponseDto> commentsToResponseDto(List<QuestionComment> questionComments) {
        if ( questionComments == null ) {
            return null;
        }

        List<QuestionCommentResponseDto> list = new ArrayList<QuestionCommentResponseDto>( questionComments.size() );
        for ( QuestionComment questionComment : questionComments ) {
            list.add( commentToCommentResponseDto( questionComment ) );
        }

        return list;
    }

    @Override
    public List<TagResponseDto> tagsToResponseDto(List<QuestionTag> questionTags) {
        if ( questionTags == null ) {
            return null;
        }

        List<TagResponseDto> list = new ArrayList<TagResponseDto>( questionTags.size() );
        for ( QuestionTag questionTag : questionTags ) {
            list.add( questionTagToTagResponseDto( questionTag ) );
        }

        return list;
    }

    protected User questionPostDtoToUser(QuestionPostDto questionPostDto) {
        if ( questionPostDto == null ) {
            return null;
        }

        User user = new User();

        user.setUserId( questionPostDto.getUserId() );

        return user;
    }

    private long questionUserUserId(Question question) {
        if ( question == null ) {
            return 0L;
        }
        User user = question.getUser();
        if ( user == null ) {
            return 0L;
        }
        long userId = user.getUserId();
        return userId;
    }

    private String questionUserName(Question question) {
        if ( question == null ) {
            return null;
        }
        User user = question.getUser();
        if ( user == null ) {
            return null;
        }
        String name = user.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private long questionCommentUserUserId(QuestionComment questionComment) {
        if ( questionComment == null ) {
            return 0L;
        }
        User user = questionComment.getUser();
        if ( user == null ) {
            return 0L;
        }
        long userId = user.getUserId();
        return userId;
    }

    private String questionCommentUserName(QuestionComment questionComment) {
        if ( questionComment == null ) {
            return null;
        }
        User user = questionComment.getUser();
        if ( user == null ) {
            return null;
        }
        String name = user.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    protected TagResponseDto questionTagToTagResponseDto(QuestionTag questionTag) {
        if ( questionTag == null ) {
            return null;
        }

        TagResponseDtoBuilder tagResponseDto = TagResponseDto.builder();

        return tagResponseDto.build();
    }
}
