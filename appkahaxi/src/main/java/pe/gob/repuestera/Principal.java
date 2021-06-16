package pe.gob.repuestera;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class Principal extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(Principal.class, args);
	}
	// aqui rondereando con mi prima XD
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Principal.class);
	}
}
