//package preproject.underdog.user.controller;
//
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.constraints.ConstraintDescriptions;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.MockMvc;
//import preproject.underdog.user.dto.UserDto;
//import preproject.underdog.user.entity.User;
//import preproject.underdog.user.mapper.UserMapper;
//import preproject.underdog.user.service.UserService;
//
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
//import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.restdocs.snippet.Attributes.key;
//
//@AutoConfigureRestDocs(outputDir = "build/generated-snippets")
//@WebMvcTest(value = UserController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//class UserControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private Gson gson;
//    @MockBean
//    private UserMapper mapper;
//    @MockBean
//    private UserService userService;
//
//    @Test
//    void postUser() throws Exception {
//        ConstraintDescriptions requestConstraints = new ConstraintDescriptions(UserDto.Post.class);
//        List<String> nameAttribute = requestConstraints.descriptionsForProperty("name");
//        List<String> emailAttribute = requestConstraints.descriptionsForProperty("email");
//        List<String> passwordAttribute = requestConstraints.descriptionsForProperty("password");
//
//        //given
//        UserDto.Post post = new UserDto.Post("홍길동", "hong@gmail.com", "abcd1234");
//        String content = gson.toJson(post);
//
//        User user = new User();
//        user.setUserId(1L);
//
//        given(mapper.postDtoToUser(Mockito.any(UserDto.Post.class))).willReturn(new User());
//        given(userService.createUser(Mockito.any(User.class))).willReturn(user);
//
//        //when, then
//        mockMvc.perform(post("/user")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .content(content)
//                ).andExpect(status().isCreated())
//                .andExpect(header().exists("Location"))
//                .andDo(document("post-user",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름")
//                                        .attributes(key("constraints").value(nameAttribute)),
//                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일")
//                                        .attributes(key("constraints").value(emailAttribute)),
//                                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
//                                        .attributes(key("constraints").value(passwordAttribute))
//                        ),
//                        responseHeaders(
//                                headerWithName("Location").description("등록된 회원의 URI")
//                        )
//                        ));
//    }
//}