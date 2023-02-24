package preproject.underdog.answer.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.dto.comment.CommentPatchDto;
import preproject.underdog.answer.dto.comment.CommentPostDto;
import preproject.underdog.answer.dto.comment.CommentRespDto;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);//DTO -> ENTITY
    @Mapping(source = "userId", target = "user.userId")
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);//DTO -> ENTITY
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "question.questionId", target = "questionId")
    @Mapping(source = "user.name", target = "name")

    AnswerRespDto answerToAnswerRespDto(Answer answer);//ENTITY -> DTO
    @Mapping(source = "answer.votes", target = "voteCount")
    List<AnswerRespDto> answerListToAnswerRespDto(List<Answer> answer);

    @Mapping(source = "userId", target = "user.userId")
    AnswerComment commentPostDtoToAnswerComment(CommentPostDto commentPostDto);//DTO -> ENTITY
    AnswerComment commentPatchDtoToAnswerComment(CommentPatchDto commentPatchDto);//DTO -> ENTITY
    @Mapping(source = "user.userId",target = "userId" )
    @Mapping(source = "answer.answerId",target = "answerId" )
    @Mapping(source = "user.name", target = "name")
    @Mapping(source = "answer.question.questionId", target = "questionId")
    CommentRespDto commentToAnswerCommentRespDto(AnswerComment answerComment);//ENTITY -> DTO
    List<CommentRespDto> commentListToAnswerRespDto(List<AnswerComment> answerComment);
}
//    @Mapping(source = "answer.votes", target = "voteCount")
//    List<AnswerRespDto> answerListToAnswerRespDto(List<Answer> answer);
