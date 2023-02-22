package preproject.underdog.answer.mapper;

import org.mapstruct.Mapper;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.dto.comment.CommentPatchDto;
import preproject.underdog.answer.dto.comment.CommentPostDto;
import preproject.underdog.answer.dto.comment.CommentRespDto;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);//DTO -> ENTITY

    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);//DTO -> ENTITY

    AnswerRespDto answerToAnswerRespDto(Answer answer);//ENTITY -> DTO

    AnswerComment commentPostDtoToAnswerComment(CommentPostDto commentPostDto);//DTO -> ENTITY

    AnswerComment commentPatchDtoToAnswerComment(CommentPatchDto commentPatchDto);//DTO -> ENTITY

    CommentRespDto commentToAnswerCommentRespDto(AnswerComment answerComment);//ENTITY -> DTO
}
