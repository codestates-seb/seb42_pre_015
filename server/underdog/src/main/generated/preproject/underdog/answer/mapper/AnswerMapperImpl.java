package preproject.underdog.answer.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.entity.Answer;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-20T01:15:08+0900",
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

        answer.setAnswerId( answerPatchDto.getAnswerId() );
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

        AnswerRespDto answerRespDto = new AnswerRespDto();

        return answerRespDto;
    }
}
