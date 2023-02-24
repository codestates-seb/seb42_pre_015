package preproject.underdog.answer.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto.AnswerRespDtoBuilder;
import preproject.underdog.answer.dto.comment.CommentPatchDto;
import preproject.underdog.answer.dto.comment.CommentPostDto;
import preproject.underdog.answer.dto.comment.CommentRespDto;
import preproject.underdog.answer.dto.comment.CommentRespDto.CommentRespDtoBuilder;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.question.entity.Question;
import preproject.underdog.user.entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-25T01:44:08+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto) {
        if ( answerPatchDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setContent( answerPatchDto.getContent() );

        return answer;
    }

    @Override
    public Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto) {
        if ( answerPostDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setUser( answerPostDtoToUser( answerPostDto ) );
        answer.setContent( answerPostDto.getContent() );

        return answer;
    }

    @Override
    public AnswerRespDto answerToAnswerRespDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerRespDtoBuilder answerRespDto = AnswerRespDto.builder();

        answerRespDto.userId( answerUserUserId( answer ) );
        answerRespDto.questionId( answerQuestionQuestionId( answer ) );
        answerRespDto.name( answerUserName( answer ) );
        answerRespDto.answerId( answer.getAnswerId() );
        answerRespDto.content( answer.getContent() );
        answerRespDto.voteCount( answer.getVoteCount() );
        answerRespDto.createdAt( answer.getCreatedAt() );
        answerRespDto.modifiedAt( answer.getModifiedAt() );

        return answerRespDto.build();
    }

    @Override
    public List<AnswerRespDto> answerListToAnswerRespDto(List<Answer> answer) {
        if ( answer == null ) {
            return null;
        }

        List<AnswerRespDto> list = new ArrayList<AnswerRespDto>( answer.size() );
        for ( Answer answer1 : answer ) {
            list.add( answerToAnswerRespDto( answer1 ) );
        }

        return list;
    }

    @Override
    public AnswerComment commentPostDtoToAnswerComment(CommentPostDto commentPostDto) {
        if ( commentPostDto == null ) {
            return null;
        }

        AnswerComment answerComment = new AnswerComment();

        answerComment.setUser( commentPostDtoToUser( commentPostDto ) );
        answerComment.setContent( commentPostDto.getContent() );

        return answerComment;
    }

    @Override
    public AnswerComment commentPatchDtoToAnswerComment(CommentPatchDto commentPatchDto) {
        if ( commentPatchDto == null ) {
            return null;
        }

        AnswerComment answerComment = new AnswerComment();

        answerComment.setContent( commentPatchDto.getContent() );

        return answerComment;
    }

    @Override
    public CommentRespDto commentToAnswerCommentRespDto(AnswerComment answerComment) {
        if ( answerComment == null ) {
            return null;
        }

        CommentRespDtoBuilder commentRespDto = CommentRespDto.builder();

        commentRespDto.userId( answerCommentUserUserId( answerComment ) );
        commentRespDto.answerId( answerCommentAnswerAnswerId( answerComment ) );
        commentRespDto.name( answerCommentUserName( answerComment ) );
        commentRespDto.questionId( answerCommentAnswerQuestionQuestionId( answerComment ) );
        commentRespDto.answerCommentId( answerComment.getAnswerCommentId() );
        commentRespDto.content( answerComment.getContent() );
        commentRespDto.createdAt( answerComment.getCreatedAt() );
        commentRespDto.modifiedAt( answerComment.getModifiedAt() );

        return commentRespDto.build();
    }

    @Override
    public List<CommentRespDto> commentListToAnswerRespDto(List<AnswerComment> answerComment) {
        if ( answerComment == null ) {
            return null;
        }

        List<CommentRespDto> list = new ArrayList<CommentRespDto>( answerComment.size() );
        for ( AnswerComment answerComment1 : answerComment ) {
            list.add( commentToAnswerCommentRespDto( answerComment1 ) );
        }

        return list;
    }

    protected User answerPostDtoToUser(AnswerPostDto answerPostDto) {
        if ( answerPostDto == null ) {
            return null;
        }

        User user = new User();

        if ( answerPostDto.getUserId() != null ) {
            user.setUserId( answerPostDto.getUserId() );
        }

        return user;
    }

    private Long answerUserUserId(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        User user = answer.getUser();
        if ( user == null ) {
            return null;
        }
        long userId = user.getUserId();
        return userId;
    }

    private Long answerQuestionQuestionId(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        Question question = answer.getQuestion();
        if ( question == null ) {
            return null;
        }
        Long questionId = question.getQuestionId();
        if ( questionId == null ) {
            return null;
        }
        return questionId;
    }

    private String answerUserName(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        User user = answer.getUser();
        if ( user == null ) {
            return null;
        }
        String name = user.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    protected User commentPostDtoToUser(CommentPostDto commentPostDto) {
        if ( commentPostDto == null ) {
            return null;
        }

        User user = new User();

        if ( commentPostDto.getUserId() != null ) {
            user.setUserId( commentPostDto.getUserId() );
        }

        return user;
    }

    private Long answerCommentUserUserId(AnswerComment answerComment) {
        if ( answerComment == null ) {
            return null;
        }
        User user = answerComment.getUser();
        if ( user == null ) {
            return null;
        }
        long userId = user.getUserId();
        return userId;
    }

    private Long answerCommentAnswerAnswerId(AnswerComment answerComment) {
        if ( answerComment == null ) {
            return null;
        }
        Answer answer = answerComment.getAnswer();
        if ( answer == null ) {
            return null;
        }
        Long answerId = answer.getAnswerId();
        if ( answerId == null ) {
            return null;
        }
        return answerId;
    }

    private String answerCommentUserName(AnswerComment answerComment) {
        if ( answerComment == null ) {
            return null;
        }
        User user = answerComment.getUser();
        if ( user == null ) {
            return null;
        }
        String name = user.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private Long answerCommentAnswerQuestionQuestionId(AnswerComment answerComment) {
        if ( answerComment == null ) {
            return null;
        }
        Answer answer = answerComment.getAnswer();
        if ( answer == null ) {
            return null;
        }
        Question question = answer.getQuestion();
        if ( question == null ) {
            return null;
        }
        Long questionId = question.getQuestionId();
        if ( questionId == null ) {
            return null;
        }
        return questionId;
    }
}
