package com.piemr.gradsync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GradSyncApplication {

    public static void main(String[] args) {
        SpringApplication.run(GradSyncApplication.class, args);
        System.out.println("🚀 GradSync Backend is running!");
        System.out.println("📊 API Documentation: http://localhost:8080/api");
        System.out.println("🎓 PIEMR Alumni Portal Backend - Ready to serve!");
    }
}
