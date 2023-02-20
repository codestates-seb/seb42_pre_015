package preproject.underdog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class UnderdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnderdogApplication.class, args);
	}

}