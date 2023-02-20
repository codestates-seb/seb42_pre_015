package preproject.underdog.answer.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import preproject.underdog.answer.dto.answer.AnswerPostDto;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = AnswerController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
public class AnswerController {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

//    @MockBean
//    private AnswerService answerService;
//
//    @MockBean
//    private AnswerMapper answerMapper;

    @Test
    @DisplayName("답변 글 작성 테스트")
    void createAnswer() throws Exception {
//        AnswerPostDto post = new AnswerPostDto("테스트용 내용", 1L,1L);
//        Answer answer = answerMapper.answerPostDtoToAnswer(post);
//
//        AnswerRespDto response = new AnswerRespDto(1L, "테스트내용", 1L, 1L, 1L, LocalDateTime.of(2023, 4, 3, 3, 3, 0), LocalDateTime.of(2023, 4, 3, 3, 3, 0));
//
//        given(answerService.createAnswer(Mockito.any(Answer.class))).willReturn(new Answer());
//        given(answerMapper.answerPostDtoToAnswer(Mockito.any(AnswerPostDto.class))).willReturn(new Answer());
//        given(answerMapper.answerToAnswerRespDto(Mockito.any(Answer.class))).willReturn(response);
//        AnswerRespDto answerRespDto = new AnswerRespDto(1L,"테스트",1L,1L,1L, LocalDateTime.of(2023, 4, 3, 3, 3, 0),LocalDateTime.of(2023, 4, 3, 3, 3, 0));
        AnswerPostDto post = new AnswerPostDto("테스트", 1L, 1L);
        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(
                        post("/answers")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isCreated());
//                .andDo(document("post-answer",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(List.of(
//                                fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
//                                fieldWithPath("userId").type(JsonFieldType.NUMBER).description("유저 id"),
//                                fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 id")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                fieldWithPath("data.answerId").type(JsonFieldType.NUMBER).description("답변 id"),
//                                fieldWithPath("data.content").type(JsonFieldType.STRING).description("답변 내용"),
//                                fieldWithPath("data.userId").type(JsonFieldType.NUMBER).description("유저 id"),
//                                fieldWithPath("data.questionId").type(JsonFieldType.NUMBER).description("질문 id"),
//                                fieldWithPath("data.voteCount").type(JsonFieldType.NUMBER).description("vote 수"),
//                                fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("답변 생성시점"),
//                                fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("답변 수정시점")
//                        )
//                    )
//                ));

    }

    @Test
    @DisplayName("답변 글 조회 테스트")
    void getAnswer() throws Exception {

    }

    @Test
    @DisplayName("답변 글 수정 테스트")
    void updateAnswer() throws Exception {

    }

    @Test
    @DisplayName("답변 글 제거 테스트")
    void deleteAnswer() throws Exception {

    }
}
