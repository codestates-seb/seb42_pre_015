package preproject.underdog.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.underdog.question.dto.comment.QuestionCommentPatchDto;
import preproject.underdog.question.dto.comment.QuestionCommentPostDto;
import preproject.underdog.question.dto.comment.QuestionCommentResponseDto;
import preproject.underdog.question.dto.question.QuestionPatchDto;
import preproject.underdog.question.dto.question.QuestionPostDto;
import preproject.underdog.question.dto.question.QuestionResponseDto;
import preproject.underdog.question.dto.tag.TagPostDto;
import preproject.underdog.question.dto.tag.TagResponseDto;
import preproject.underdog.question.entity.Question;
import preproject.underdog.question.entity.QuestionComment;
import preproject.underdog.question.entity.QuestionTag;
import preproject.underdog.tag.entity.Tag;

import java.util.List;


@Mapper(componentModel = "spring")
public interface QuestionMapper {
    @Mapping(source = "userId", target = "user.userId")
    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.name", target = "userName")
    QuestionResponseDto questionToQuestionResponseDto(Question question);
    QuestionComment commentPostDtoToQuestion(QuestionCommentPostDto commentPostDto);
    QuestionComment commentPatchDtoToQuestion(QuestionCommentPatchDto commentPatchDto);
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.name", target = "userName")
    QuestionCommentResponseDto commentToCommentResponseDto(QuestionComment questionComment);
    Tag tagPostDtoToTag(TagPostDto tagPostDto);
    TagResponseDto tagToTagResponseDto(Tag tag);
    List<QuestionResponseDto> questionsToResponseDto(List<Question>questions);
    List<QuestionCommentResponseDto> commentsToResponseDto(List<QuestionComment>questionComments);
    List<TagResponseDto> tagsToResponseDto(List<QuestionTag>questionTags);

}
