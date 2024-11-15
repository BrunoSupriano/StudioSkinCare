package com.example.dgc;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = "com.example.dgc")
@EntityScan({"com.example.dgc.Clientes", "com.example.dgc.Servicos", "com.example.dgc.Usuario"})  // Certifique-se de que o pacote está correto

public class DgcApplication {
    public static void main(String[] args) {
        new SpringApplicationBuilder(DgcApplication.class).run(args);
    }
}
