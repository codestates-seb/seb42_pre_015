package preproject.question.controller;


import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.constraints.ConstraintDescriptions;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import preproject.question.dto.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(QuestionController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
class QuestionControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;

    @Test
    void postQuestion() throws Exception {
        QuestionAllDto.Post post = new QuestionAllDto.Post("dd", 1L, 1L, "tt");
        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(
                        post("/question")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)

                );
        actions
                .andExpect(status().isCreated())
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andDo(document("post-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("본문"),
                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("userId"),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("questionId")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }

    @Test
    void patchQuestion() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionAllDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        long questionId = 1L;
        QuestionAllDto.Patch patch = new QuestionAllDto.Patch("dd", "dd");
        String content = gson.toJson(patch);

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.patch("/question/{question-id}", +questionId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                        ).andExpect(status().isOk())
                        .andDo(document("patch-question",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("제목 수정 내용").attributes(key("constraints").value(contentAttribute)),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("본문 수정 내용").attributes(key("constraints").value(contentAttribute))
                                ),
                                pathParameters(
                                        parameterWithName("question-id").description("질문 id")
                                )
                        ));


    }

    @Test
    void getQuestion() throws Exception {
        QuestionAllDto.Response response = new QuestionAllDto.Response(1L, 1L, "ss", "dd", 1, 1,
                LocalDateTime.of(2023, 4, 3, 3, 3, 0),
                LocalDateTime.of(2023, 4, 3, 3, 3, 1), 1);
        long questionId = 1L;
        String content = gson.toJson(response);

        mockMvc.perform(RestDocumentationRequestBuilders.get("/question/{question-id}", +questionId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content)
                ).andExpect(status().isOk())
                .andDo(document("get-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 id")
                        ),
                        responseFields(
                                fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문글 id"),
                                fieldWithPath("userId").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("질문글 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("질문글 내용"),
                                fieldWithPath("viewCount").type(JsonFieldType.NUMBER).description("조회수"),
                                fieldWithPath("voteCount").type(JsonFieldType.NUMBER).description("좋아요 수"),
                                fieldWithPath("createdAt").type(JsonFieldType.STRING).description("작성일"),
                                fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정일"),
                                fieldWithPath("questionCommentId").type(JsonFieldType.NUMBER).description("질문글 코멘트 id")
                        )));

    }

    @Test
    void deleteQuestion() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionAllDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        long questionId = 1L;
        mockMvc.perform(
                        RestDocumentationRequestBuilders.delete("/question/{question-id}", +questionId)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isNoContent())
                .andDo(document("delete-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문글 id")
                        )));
    }

    @Test
    void postComment() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionAllDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        long questionId = 1L;
        QuestionAllDto.Post post = new QuestionAllDto.Post("dd", 1L, 1L, "tt");
        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.post("/question/{question-id}/comment", +questionId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                        ).andExpect(status().isOk())
                        .andDo(document("post-questionComment",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("제목").attributes(key("constraints").value(contentAttribute)),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("본문").attributes(key("constraints").value(contentAttribute)),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자").attributes(key("constraints").value(contentAttribute)),
                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("작성자 식별").attributes(key("constraints").value(contentAttribute))

                                ),
                                pathParameters(
                                        parameterWithName("question-id").description("질문 id")
                                )
                        ));
    }

    @Test
    void patchComment() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionAllDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        long questionId = 1L;
        long userId = 1L;
        long commentId = 1L;
        QuestionAllDto.Patch patch = new QuestionAllDto.Patch("dd", "dd");
        String content = gson.toJson(patch);

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.patch("/question//{question-id}/comment/{user-id}/{comment-id}", +questionId, userId, commentId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                        ).andExpect(status().isOk())
                        .andDo(document("patch-questionComment",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("제목 수정 내용").attributes(key("constraints").value(contentAttribute)),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("본문 수정 내용").attributes(key("constraints").value(contentAttribute))
                                ),
                                pathParameters(
                                        parameterWithName("question-id").description("질문 id"),
                                        parameterWithName("user-id").description("유저 id"),
                                        parameterWithName("comment-id").description("코멘트 id")

                                )
                        ));
    }

    @Test
    void getComments() throws Exception {
        List<QuestionCommentResponseDto> response = List.of(QuestionCommentResponseDto.builder()
                .questionId(1L).content("test").questionId(1L).userId(1L)
                .createdAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0))
                .modifiedAt(LocalDateTime.of(2023, 4, 3, 3, 3, 0)).questionCommentId(1l).build());
        long questionId = 1L;
        String content = gson.toJson(response);

        mockMvc.perform(RestDocumentationRequestBuilders.get("/question/{question-id}/comment", +questionId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content)
                ).andExpect(status().isOk())
                .andDo(document("get-questionComments",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 id")
                        ),
                        responseFields(
                                fieldWithPath("[0].questionId").type(JsonFieldType.NUMBER).description("질문글 id"),
                                fieldWithPath("[0].userId").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("[0].content").type(JsonFieldType.STRING).description("질문글 내용"),
                                fieldWithPath("[0].createdAt").type(JsonFieldType.STRING).description("작성일"),
                                fieldWithPath("[0].modifiedAt").type(JsonFieldType.STRING).description("수정일"),
                                fieldWithPath("[0].questionCommentId").type(JsonFieldType.NUMBER).description("질문글 코멘트 id")
                        )));
    }

    @Test
    void postVote() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionAllDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        long questionId = 1L;
        long userId = 1L;
        mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/question/{question-id}/vote/{user-id}", +questionId, userId)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(document("post-vote",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문글 id"),
                                parameterWithName("user-id").description("유저 id")
                        )));
    }

    @Test
    void deleteVote() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionAllDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        long questionId = 1L;
        long userId = 1L;
        mockMvc.perform(
                        RestDocumentationRequestBuilders.delete("/question/{question-id}/vote/{user-id}", +questionId, userId)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isNoContent())
                .andDo(document("delete-vote",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문글 id"),
                                parameterWithName("user-id").description("유저 id")
                        )));
    }
    @Test
    void postTag() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(TagPostDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("tagName");
        long questionId = 1L;
        TagPostDto post = new TagPostDto( "tt");
        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.post("/question/{question-id}/tag", + questionId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                        ).andExpect(status().isOk())
                        .andDo(document("post-tag",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("tagName").type(JsonFieldType.STRING).description("태그 이름").attributes(key("constraints").value(contentAttribute))
                                ),
                                pathParameters(
                                        parameterWithName("question-id").description("질문 id")
                                )
                        ));

    }
    @Test
    void getQuestionTag() throws Exception{
        List<TagResponseDto> response = List.of(TagResponseDto.builder()
                .questionId(1L).tagId(1L).tagName("dd").build());
        long questionId = 1L;
        long tagId=1L;
        String content = gson.toJson(response);

        mockMvc.perform(RestDocumentationRequestBuilders.get("/question/{question-id}/tag/{tag-id}", +questionId,tagId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content)
                ).andExpect(status().isOk())
                .andDo(document("get-questionTag",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 id"),
                                parameterWithName("tag-id").description("태그 id")
                        ),
                        responseFields(
                                fieldWithPath("[0].questionId").type(JsonFieldType.NUMBER).description("질문글 id"),
                                fieldWithPath("[0].tagId").type(JsonFieldType.NUMBER).description("태그 id"),
                                fieldWithPath("[0].tagName").type(JsonFieldType.STRING).description("태그 이름")

                        )));

    }

}