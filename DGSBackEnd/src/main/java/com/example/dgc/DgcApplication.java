package com.example.dgc;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;


@SpringBootApplication
@EntityScan("com.example.dgc")  // Certifique-se de que o pacote está correto

public class DgcApplication {
    public static void main(String[] args) {
        new SpringApplicationBuilder(DgcApplication.class).run(args);
    }
}
