package preproject.underdog.answer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import preproject.underdog.answer.service.AnswerService;

@RestController
@RequestMapping("/answers")
@Validated
@RequiredArgsConstructor
public class AnswerCommentController {

    private final AnswerService answerService;

    @GetMapping
    public ResponseEntity getComments() {
        return ResponseEntity.ok(null);
    }

    @PostMapping
    public ResponseEntity postComment() {
        return ResponseEntity.created(null).build();
    }

    @PatchMapping
    public ResponseEntity patchComment() {
        return ResponseEntity.ok(null);
    }

    @DeleteMapping
    public ResponseEntity deleteComment() {
        return ResponseEntity.noContent().build();
    }
}
