package preproject.underdog.question.controller;


import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.constraints.ConstraintDescriptions;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import preproject.underdog.question.dto.comment.QuestionCommentPatchDto;
import preproject.underdog.question.dto.comment.QuestionCommentPostDto;
import preproject.underdog.question.dto.comment.QuestionCommentResponseDto;
import preproject.underdog.question.dto.question.QuestionPatchDto;
import preproject.underdog.question.dto.question.QuestionPostDto;
import preproject.underdog.question.dto.question.QuestionResponseDto;
import preproject.underdog.question.dto.tag.TagPostDto;
import preproject.underdog.question.dto.tag.TagResponseDto;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
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
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionPostDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        List<String> titleAttribute = requestConstraints.descriptionsForProperty("title");
        List<String > userIdAttribute = requestConstraints.descriptionsForProperty("userId");

        QuestionPostDto post = new QuestionPostDto(1L, "title","content");
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
                                fieldWithPath("userId").type(JsonFieldType.NUMBER).description("유저 Id").attributes(key("constraints").value(userIdAttribute)),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목").attributes(key("constraints").value(titleAttribute)).optional(),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("본문").attributes(key("constraints").value(contentAttribute)).optional()),

                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("등록된 질문의 URI")
                        )
                ));
    }

    @Test
    void patchQuestion() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionPatchDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        List<String> titleAttribute = requestConstraints.descriptionsForProperty("title");

        long questionId = 1L;
        QuestionPatchDto patch = new QuestionPatchDto("title", "content");
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
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("제목 수정 내용").attributes(key("constraints").value(contentAttribute)).optional(),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("본문 수정 내용").attributes(key("constraints").value(titleAttribute)).optional()
                                ),
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
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정일")
                                )
                        ));
    }

    @Test
    void getQuestions() throws Exception {
        Pageable pageRequest = PageRequest.of(1, 1, Sort.by(Sort.Direction.DESC, "questionId"));

        mockMvc.perform(RestDocumentationRequestBuilders.get("/question")
                        .param("page", "1")
                        .param("size", "1")
                        .param("sort", "questionId,desc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(document("get-questions",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("조회 페이지 번호"),
                                parameterWithName("size").description("페이지 내 요소 갯수"),
                                parameterWithName("sort").description("정렬 기준 및 방식. ex) questionId,desc")
                        ),
                        responseFields(
                                fieldWithPath("data[0].questionId").type(JsonFieldType.NUMBER).description("질문글 id"),
                                fieldWithPath("data[0].userId").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("data[0].title").type(JsonFieldType.STRING).description("질문글 제목"),
                                fieldWithPath("data[0].content").type(JsonFieldType.STRING).description("질문글 내용"),
                                fieldWithPath("data[0].viewCount").type(JsonFieldType.NUMBER).description("조회수"),
                                fieldWithPath("data[0].voteCount").type(JsonFieldType.NUMBER).description("좋아요 수"),
                                fieldWithPath("data[0].createdAt").type(JsonFieldType.STRING).description("작성일"),
                                fieldWithPath("data[0].modifiedAt").type(JsonFieldType.STRING).description("수정일"),
                                fieldWithPath("pageInfo.pageNumber").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 내 요소 갯수"),
                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수"),
                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 요소 갯수")
                        )));
    }

    @Test
    void getQuestion() throws Exception {
        Long questionId = 1L;

        QuestionResponseDto response = new QuestionResponseDto(1L, 1L, "ss", "dd", 1, 1,
                LocalDateTime.of(2023, 4, 3, 3, 3, 0),
                LocalDateTime.of(2023, 4, 3, 3, 3, 1));

        mockMvc.perform(get("/question/{question-id}", questionId))
                .andExpect(status().isOk())
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
                                fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정일")
                        )
                        ));
    }

    @Test
    void deleteQuestion() throws Exception {
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
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionCommentPostDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");
        List<String> userIdAttribute = requestConstraints.descriptionsForProperty("userId");

        long questionId = 1L;
        QuestionCommentPostDto post = new QuestionCommentPostDto("content", 1L);
        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.post("/question/{question-id}/comment", +questionId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                        ).andExpect(status().isCreated())
                        .andDo(document("post-question-comment",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("본문").attributes(key("constraints").value(contentAttribute)),
                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("작성자 식별").attributes(key("constraints").value(userIdAttribute))
                                ),
                                pathParameters(
                                        parameterWithName("question-id").description("질문 id")
                                ),
                                responseHeaders(
                                        headerWithName(HttpHeaders.LOCATION).description("질문에 등록된 댓글 URI")
                                )
                        ));
    }

    @Test
    void patchComment() throws Exception {
        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(QuestionCommentPatchDto.class);
        List<String> contentAttribute = requestConstraints.descriptionsForProperty("content");

        long questionId = 1L;
        long commentId = 1L;
        QuestionCommentPatchDto patch = new QuestionCommentPatchDto("content");
        String content = gson.toJson(patch);

        QuestionCommentResponseDto response = new QuestionCommentResponseDto(1L, 1L, 1L, "content",
                LocalDateTime.of(2023, 4, 3, 3, 3, 0),
                LocalDateTime.of(2023, 4, 3, 3, 3, 1));

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.patch("/question/{question-id}/comment/{comment-id}", +questionId, commentId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(content)
                        ).andExpect(status().isOk())
                        .andDo(document("patch-question-comment",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 본문").attributes(key("constraints").value(contentAttribute))
                                ),
                                pathParameters(
                                        parameterWithName("question-id").description("질문 id"),
                                        parameterWithName("comment-id").description("댓글 id")
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
                .andDo(document("get-question-comments",
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
    void deleteComment() throws Exception {
        long questionId = 1L;
        long commentId = 1L;

        mockMvc.perform(
                        RestDocumentationRequestBuilders.delete("/question/{question-id}/comment/{comment-id}", questionId,commentId)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isNoContent())
                .andDo(document("delete-question-comment",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문글 id"),
                                parameterWithName("comment-id").description("댓글 id")
                        )));
    }

    @Test
    void postVote() throws Exception {
        long questionId = 1L;
        long userId = 1L;
        mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/question/{question-id}/vote/{user-id}", +questionId, userId)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(document("post-question-vote",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문글 id"),
                                parameterWithName("user-id").description("유저 id")
                        )));
    }

    @Test
    void deleteVote() throws Exception {
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
        TagPostDto post = new TagPostDto("tag");
        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(RestDocumentationRequestBuilders.post("/question/{question-id}/tag", +questionId)
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
    void getQuestionTags() throws Exception {
        List<TagResponseDto> response = List.of(TagResponseDto.builder()
                .questionId(1L).tagId(1L).name("dd").build());
        long questionId = 1L;
        String content = gson.toJson(response);

        mockMvc.perform(RestDocumentationRequestBuilders.get("/question/{question-id}/tag", +questionId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content)
                ).andExpect(status().isOk())
                .andDo(document("get-questionTag",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 id")
                        ),
                        responseFields(
                                fieldWithPath("[0].questionId").type(JsonFieldType.NUMBER).description("질문글 id"),
                                fieldWithPath("[0].tagId").type(JsonFieldType.NUMBER).description("태그 id"),
                                fieldWithPath("[0].name").type(JsonFieldType.STRING).description("태그 이름")
                        )));
    }

}