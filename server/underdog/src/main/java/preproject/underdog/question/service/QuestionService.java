package preproject.question.service;


import preproject.question.repository.QuestionRepository;
import preproject.underdog.question.entity.Question;


public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }


    public Question createQuestion(Question question){
        return questionRepository.save(question);
    }
}
