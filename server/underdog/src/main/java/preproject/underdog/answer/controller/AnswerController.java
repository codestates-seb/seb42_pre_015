package preproject.underdog.answer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.underdog.answer.dto.answer.AnswerPostDto;
import preproject.underdog.answer.dto.answer.AnswerRespDto;
import preproject.underdog.answer.entity.Answer;
import preproject.underdog.answer.mapper.AnswerMapper;
import preproject.underdog.answer.service.AnswerService;
import preproject.underdog.utils.Uri;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/answers")
@Validated
@RequiredArgsConstructor
public class AnswerController {

    private final String DEFAULT_URI = "/answers/";
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    @PostMapping
    public ResponseEntity postAnswer(@RequestBody @Valid AnswerPostDto post) {
        Answer postAnswer = answerMapper.answerPostDtoToAnswer(post);
        Answer createdAnswer = answerService.createAnswer(postAnswer);
        URI location = Uri.createUri(DEFAULT_URI, Long.toString(createdAnswer.getAnswerId()));
        return ResponseEntity.created(location).build();
    }
}
//    @PatchMapping("{answer-id}")
//    public ResponseEntity patchAnswer() {
//        return ResponseEntity.ok(null);
//    }
//
//    @GetMapping("questions/{id}/answers")
//    public ResponseEntity getAnswers() {
//        return ResponseEntity.ok(null);
//
//    }
//
//    @DeleteMapping("{answer-id}")
//    public ResponseEntity deleteAnswer() {
//        return ResponseEntity.noContent().build();
//    }
//}
