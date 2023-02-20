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
import preproject.underdog.response.SingleResponse;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/answers")
@Validated
@RequiredArgsConstructor
public class AnswerController {

    private AnswerService answerService;
    private AnswerMapper answerMapper;

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto) {
//        Answer answer = answerService.createAnswer(answerMapper.answerPostDtoToAnswer(answerPostDto));
//
//        AnswerRespDto response = answerMapper.answerToAnswerRespDto(answer);
        AnswerRespDto answerRespDto = new AnswerRespDto(1L,"테스트",1L,1L,1L, LocalDateTime.of(2023, 4, 3, 3, 3, 0),LocalDateTime.of(2023, 4, 3, 3, 3, 0));

        return new ResponseEntity<>(answerRespDto, HttpStatus.CREATED);
    }

    @PatchMapping("{answer-id}")
    public ResponseEntity patchAnswer() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("questions/{id}/answers")
    public ResponseEntity getAnswers() {
        return ResponseEntity.ok(null);

    }

    @DeleteMapping("{answer-id}")
    public ResponseEntity deleteAnswer() {
        return ResponseEntity.noContent().build();
    }
}
