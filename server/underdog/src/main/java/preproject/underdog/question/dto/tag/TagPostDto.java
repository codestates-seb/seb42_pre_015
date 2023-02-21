package preproject.underdog.question.dto.tag;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class TagPostDto {
    @NotBlank
    private String tagName;
}
