package com.example.dgc.Agendamento;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<?> agendar(@RequestBody AgendamentoRequest agendamentoRequest) {
        Logger logger = LoggerFactory.getLogger(this.getClass());  // Create a logger instance
    
        // Verificar se os campos obrigatórios estão presentes
        if (agendamentoRequest.getDataInicial() == null || agendamentoRequest.getDataFinal() == null 
            || agendamentoRequest.getId_servicos() == null || agendamentoRequest.getId_servicos().isEmpty()) {
            return ResponseEntity.badRequest().body("As datas inicial, final e os serviços são obrigatórios");
        }
    
        LocalDateTime dataInicial;
        LocalDateTime dataFinal;
        
        try {
            dataInicial = LocalDateTime.parse(agendamentoRequest.getDataInicial());
            dataFinal = LocalDateTime.parse(agendamentoRequest.getDataFinal());
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data/hora inválido. Use o formato: yyyy-MM-ddTHH:mm:ss");
        }
    
        try {
            // Forma mais segura de lidar com o status possivelmente nulo
            Integer status = Optional.ofNullable(agendamentoRequest.getStatus()).orElse(1);  // Valor padrão é 1
    
            // Criar múltiplos agendamentos para cada serviço
            agendamentoService.agendar(
                agendamentoRequest.getId_cliente(),
                agendamentoRequest.getId_servicos(),
                dataInicial,
                dataFinal,
                status
            );
            return ResponseEntity.ok("Agendamentos realizados com sucesso!");
        } catch (RuntimeException e) {
            logger.error("Erro ao agendar: {}", e.getMessage(), e);  // Log the error with the exception stack trace
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Erro interno no servidor: {}", e.getMessage(), e);  // Log the error with the exception stack trace
            return ResponseEntity.internalServerError().body("Erro interno do servidor: " + e.getMessage());
        }
    }

    @GetMapping
    public List<AgendamentoModel> listarTodos() {
        return agendamentoService.listarTodos();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody AgendamentoRequest agendamentoRequest) {
        Logger logger = LoggerFactory.getLogger(this.getClass());  // Create a logger instance

        // Verificar se os campos obrigatórios estão presentes
        if (agendamentoRequest.getDataInicial() == null || agendamentoRequest.getDataFinal() == null 
            || agendamentoRequest.getId_servicos() == null || agendamentoRequest.getId_servicos().isEmpty()) {
            return ResponseEntity.badRequest().body("As datas inicial, final e os serviços são obrigatórios");
        }
    
        LocalDateTime dataInicial;
        LocalDateTime dataFinal;
        
        try {
            dataInicial = LocalDateTime.parse(agendamentoRequest.getDataInicial());
            dataFinal = LocalDateTime.parse(agendamentoRequest.getDataFinal());
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data/hora inválido. Use o formato: yyyy-MM-ddTHH:mm:ss");
        }

        try {
            Integer status = Optional.ofNullable(agendamentoRequest.getStatus()).orElse(1);  // Valor padrão é 1
    
            agendamentoService.atualizar(
                id,
                agendamentoRequest.getId_cliente(),
                agendamentoRequest.getId_servicos(),
                dataInicial,
                dataFinal,
                status
            );
            return ResponseEntity.ok("Agendamento atualizado com sucesso!");
        } catch (RuntimeException e) {
            logger.error("Erro ao atualizar agendamento: {}", e.getMessage(), e);  // Log the error with the exception stack trace
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        Logger logger = LoggerFactory.getLogger(this.getClass());  // Create a logger instance

        try {
            agendamentoService.deletar(id);
            return ResponseEntity.ok("Agendamento deletado com sucesso!");
        } catch (RuntimeException e) {
            logger.error("Erro ao deletar agendamento: {}", e.getMessage(), e);  // Log the error with the exception stack trace
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
