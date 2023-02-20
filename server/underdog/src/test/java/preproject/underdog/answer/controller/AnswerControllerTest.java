package preproject.underdog.answer.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.constraints.ConstraintDescriptions;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import preproject.underdog.answer.dto.answer.AnswerPatchDto;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.dto.comment.CommentPatchDto;
import preproject.underdog.answer.dto.comment.CommentPostDto;
import preproject.underdog.answer.dto.comment.CommentRespDto;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.entity.AnswerComment;
import preproject.underdog.answer.mapper.AnswerMapper;
import preproject.underdog.answer.service.AnswerService;


import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@AutoConfigureRestDocs(outputDir = "build/generated-snippets")
@WebMvcTest(value = AnswerController.class)
@MockBean(JpaMetamodelMappingContext.class)
class AnswerControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private AnswerMapper mapper;
    @MockBean
    private AnswerService answerService;

    @Test
    void postAnswer() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(AnswerPostDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        List<String> userIdAttribute = requestConstraints.descriptionsForProperty("userId");
        List<String> questionIdAttribute = requestConstraints.descriptionsForProperty("questionId");


        //given
        AnswerPostDto post = new AnswerPostDto("test", 1L, 1L);
        String content = gson.toJson(post);

        Answer answer = new Answer();
        answer.setAnswerId(1L);

        given(mapper.answerPostDtoToAnswer(Mockito.any(AnswerPostDto.class))).willReturn(new Answer());
        given(answerService.createAnswer(Mockito.any(Answer.class))).willReturn(answer);
        mockMvc.perform(post("/answer/")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(content)
        ).andExpect(status().isCreated())
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andDo(document("post-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용").attributes(key("constraints").value(contentAttribute)),
                                fieldWithPath("userId").type(JsonFieldType.NUMBER).description("유저 id").attributes(key("constraints").value(userIdAttribute)),
                                fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문글 id").attributes(key("constraints").value(questionIdAttribute))
                        )
                        )
                        );
    }

    @Test
    void patchAnswer() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(AnswerPatchDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");

        AnswerRespDto response = new AnswerRespDto(1L, "test", 1L, 1L, 1L, LocalDateTime.of(2023, 4, 3, 3, 3, 0), LocalDateTime.of(2023, 4, 3, 3, 3, 0));
        long answerId = 1L;
        AnswerPatchDto patch = new AnswerPatchDto("test");
        String content = gson.toJson(patch);
        Answer answer = new Answer();
        answer.setAnswerId(1L);


        given(mapper.answerPatchDtoToAnswer(Mockito.any(AnswerPatchDto.class))).willReturn(new Answer());
        given(answerService.updateAnswer(Mockito.any(Answer.class))).willReturn(answer);
        given(mapper.answerToAnswerRespDto(Mockito.any(Answer.class))).willReturn(response);
        mockMvc.perform(patch("/answer/" + answerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content)
                ).andExpect(status().isOk())
                .andDo(document("patch-answers",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()),
                            requestFields(
                                fieldWithPath("content").type(JsonFieldType.STRING).description("답변 수정 내용").attributes(key("constraints").value(contentAttribute))
                                )
                        )
                );
    }

    @Test
    void deleteAnswer() throws Exception {
//        AnswerRespDto response = new AnswerRespDto(1L, "before patch", 1L, 1L, 1L, LocalDateTime.of(2023, 4, 3, 3, 3, 0), LocalDateTime.of(2023, 4, 3, 3, 3, 0));
        long answerId = 1L;
        doNothing().when(answerService).deleteAnswer(Mockito.anyLong());

        mockMvc.perform(
                RestDocumentationRequestBuilders.delete("/answer/{answer-id}", + answerId)
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent())
                .andDo(document("delete-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("answer-id").description("답변글 id")
                        )));
    }

    @Test
    void postComment() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(CommentPostDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        List<String> userIdAttribute = requestConstraints.descriptionsForProperty("userId");
        List<String> answerIdAttribute = requestConstraints.descriptionsForProperty("answerId");

        CommentPostDto post = new CommentPostDto("test", 1L, 1L);
        String content = gson.toJson(post);

        AnswerComment comment = new AnswerComment();
        comment.setAnswerCommentId(1L);

        long answerId = 1L;

        given(mapper.commentPostDtoToAnswerComment(Mockito.any(CommentPostDto.class))).willReturn(new AnswerComment());
        given(answerService.postComment(Mockito.any(AnswerComment.class))).willReturn(comment);
        mockMvc.perform(post("/answer/{answer-id}/comments", + answerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content)
                ).andExpect(status().isCreated())
                .andDo(document("post-comment",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용").attributes(key("constraints").value(contentAttribute)),
                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("유저 id").attributes(key("constraints").value(userIdAttribute)),
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("답변글 id").attributes(key("constraints").value(answerIdAttribute))
                                )
                        )
                );
    }

    @Test
    void patchComment() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(CommentPatchDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");

        CommentRespDto response = new CommentRespDto(1L, 1L, "test", 1L, 1L, LocalDateTime.of(2023, 4, 3, 3, 3, 0), LocalDateTime.of(2023, 4, 3, 3, 3, 0));
        long answerId = 1L;
        CommentPatchDto patch = new CommentPatchDto("test");
        String content = gson.toJson(patch);
        AnswerComment comment = new AnswerComment();
        comment.setAnswerCommentId(1L);
        long answerCommentId = 1L;

        given(mapper.commentPatchDtoToAnswerComment(Mockito.any(CommentPatchDto.class))).willReturn(new AnswerComment());
        given(answerService.patchComment(Mockito.any(AnswerComment.class))).willReturn(comment);
        given(mapper.commentToAnswerCommentRespDto(Mockito.any(AnswerComment.class))).willReturn(response);
        mockMvc.perform(patch("/answer/{answer-id}/{answer-comment-id}", + answerId,answerCommentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content)
                ).andExpect(status().isOk())
                .andDo(document("patch-comment",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),

                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 수정 내용").attributes(key("constraints").value(contentAttribute))
                                )
                        )
                );
    }

    @Test
    void deleteComment() throws Exception{
        long answerId = 1L;
        doNothing().when(answerService).deleteComment(Mockito.anyLong());
        long answerCommentId = 1L;
        mockMvc.perform(
                        RestDocumentationRequestBuilders.delete("/answer/{answer-id}/{answer-comment-id}", + answerId,answerCommentId)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isNoContent())
                .andDo(document("delete-comment",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("answer-id").description("답변글 id"),
                                parameterWithName("answer-comment-id").description("댓글 id")
                        )));
    }

    @Test
    void getAnswer() {
    }
}
