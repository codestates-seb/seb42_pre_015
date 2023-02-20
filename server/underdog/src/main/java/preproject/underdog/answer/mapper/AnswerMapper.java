package preproject.underdog.answer.mapper;

import org.mapstruct.Mapper;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.entity.Answer;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);

    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);

    AnswerRespDto answerToAnswerRespDto(Answer answer);
}
