package preproject.underdog.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.underdog.question.dto.comment.QuestionCommentPatchDto;
import preproject.underdog.question.dto.comment.QuestionCommentPostDto;
import preproject.underdog.question.dto.comment.QuestionCommentResponseDto;
import preproject.underdog.question.dto.question.QuestionPatchDto;
import preproject.underdog.question.dto.question.QuestionPostDto;
import preproject.underdog.question.dto.question.QuestionResponseDto;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;

import java.util.List;


@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(target = "answerCount", expression = "java(question.getAnswerList()!= null ? question.getAnswerList().size():0)")
    QuestionResponseDto questionToQuestionResponseDto(Question question);

    QuestionComment commentPostDtoToQuestionComment(QuestionCommentPostDto commentPostDto);
    QuestionComment commentPatchDtoToQuestionComment(QuestionCommentPatchDto commentPatchDto);
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "question.questionId", target = "questionId")
    QuestionCommentResponseDto commentToCommentResponseDto(QuestionComment questionComment);

    List<QuestionResponseDto> questionsToResponseDto(List<Question>questions);
    List<QuestionCommentResponseDto> commentsToResponseDto(List<QuestionComment>questionComments);

}
