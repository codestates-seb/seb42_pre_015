package preproject.underdog.answer.mapper;

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
import preproject.underdog.answer.dto.vote.VotePostDto;
import preproject.underdog.answer.dto.vote.VoteRespDto;
import preproject.underdog.answer.dto.vote.VoteRespDto.VoteRespDtoBuilder;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.entity.AnswerVote;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-21T02:12:10+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
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

        answer.setContent( answerPostDto.getContent() );

        return answer;
    }

    @Override
    public AnswerRespDto answerToAnswerRespDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerRespDtoBuilder answerRespDto = AnswerRespDto.builder();

        answerRespDto.answerId( answer.getAnswerId() );
        answerRespDto.content( answer.getContent() );
        answerRespDto.createdAt( answer.getCreatedAt() );
        answerRespDto.modifiedAt( answer.getModifiedAt() );

        return answerRespDto.build();
    }

    @Override
    public AnswerComment commentPostDtoToAnswerComment(CommentPostDto commentPostDto) {
        if ( commentPostDto == null ) {
            return null;
        }

        AnswerComment answerComment = new AnswerComment();

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

        commentRespDto.answerCommentId( answerComment.getAnswerCommentId() );
        commentRespDto.content( answerComment.getContent() );
        commentRespDto.createdAt( answerComment.getCreatedAt() );
        commentRespDto.modifiedAt( answerComment.getModifiedAt() );

        return commentRespDto.build();
    }

    @Override
    public AnswerVote votePostDtoToAnswerVote(VotePostDto votePostDto) {
        if ( votePostDto == null ) {
            return null;
        }

        AnswerVote answerVote = new AnswerVote();

        return answerVote;
    }

    @Override
    public VoteRespDto voteToAnswerVoteRespDto(AnswerVote answerVote) {
        if ( answerVote == null ) {
            return null;
        }

        VoteRespDtoBuilder voteRespDto = VoteRespDto.builder();

        return voteRespDto.build();
    }
}
