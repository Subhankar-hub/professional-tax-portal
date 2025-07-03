
package io.example.professionaltaxportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = {"http://localhost:3000", "http://0.0.0.0:3000", "https://*.replit.dev"})
public class ProfessionaltaxportalApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProfessionaltaxportalApplication.class, args);
    }
}
