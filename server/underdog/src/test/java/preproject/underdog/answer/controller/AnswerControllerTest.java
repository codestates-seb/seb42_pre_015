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
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.mapper.AnswerMapper;
import preproject.underdog.answer.service.AnswerService;


import java.util.List;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
//        given(mapper.answerToAnswerRespDto(Mockito.any(Answer.class))).willReturn()
        mockMvc.perform(post("/answers/")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(content)
        ).andExpect(status().isCreated())
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andDo(document("post-answers",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용").attributes(key("constraints").value(contentAttribute)),
                                fieldWithPath("userId").type(JsonFieldType.NUMBER).description("유저 id").attributes(key("constraints").value(userIdAttribute)),
                                fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문글 id").attributes(key("constraints").value(questionIdAttribute))
                        )
                        ,responseFields(
                                fieldWithPath("data[0].answerId").type(JsonFieldType.NUMBER).description("답변글 id"),
                                fieldWithPath("data[0].content").type(JsonFieldType.STRING).description("글 내용"),
                                fieldWithPath("data[0].userId").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("data[0].questionId").type(JsonFieldType.NUMBER).description("질문글 id"),
                                fieldWithPath("data[0].voteCount").type(JsonFieldType.NUMBER).description("vote 수"),
                                fieldWithPath("data[0].createdAt").type(JsonFieldType.STRING).description("생성일"),
                                fieldWithPath("data[0].modifiedAt").type(JsonFieldType.STRING).description("수정일")
                        )
                        )
                        );
    }

}
