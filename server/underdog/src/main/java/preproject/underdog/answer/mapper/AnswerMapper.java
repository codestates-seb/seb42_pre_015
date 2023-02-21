package preproject.underdog.answer.mapper;

import org.mapstruct.Mapper;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.dto.comment.CommentPatchDto;
import preproject.underdog.answer.dto.comment.CommentPostDto;
import preproject.underdog.answer.dto.comment.CommentRespDto;
import preproject.underdog.answer.dto.vote.VotePostDto;
import preproject.underdog.answer.dto.vote.VoteRespDto;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.entity.AnswerVote;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);

    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);

    AnswerRespDto answerToAnswerRespDto(Answer answer);

    AnswerComment commentPostDtoToAnswerComment(CommentPostDto commentPostDto);

    AnswerComment commentPatchDtoToAnswerComment(CommentPatchDto commentPatchDto);

    CommentRespDto commentToAnswerCommentRespDto(AnswerComment answerComment);

    AnswerVote votePostDtoToAnswerVote(VotePostDto votePostDto);

    VoteRespDto voteToAnswerVoteRespDto(AnswerVote answerVote);
}
