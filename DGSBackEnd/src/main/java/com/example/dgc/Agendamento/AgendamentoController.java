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
        if (agendamentoRequest.getDataInicial() == null || agendamentoRequest.getDataFinal() == null) {
            return ResponseEntity.badRequest().body("As datas inicial e final são obrigatórias");
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
            Integer status = Optional.ofNullable(agendamentoRequest.getStatus())
                .orElse(1);  // Valor padrão é 1
    
            AgendamentoModel agendamento = agendamentoService.agendar(
                agendamentoRequest.getId_cliente(),
                agendamentoRequest.getId_servico(),
                dataInicial,
                dataFinal,
                status
            );
            return ResponseEntity.ok(agendamento);
        } catch (RuntimeException e) {
            logger.error("Erro ao agendar: {}", e.getMessage(), e); // Log the error with the exception stack trace
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Erro interno no servidor: {}", e.getMessage(), e); // Log the error with the exception stack trace
            return ResponseEntity.internalServerError().body("Erro interno do servidor: " + e.getMessage());
        }
    }
    @GetMapping
    public List<AgendamentoModel> listarTodos() {
        return agendamentoService.listarTodos();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoModel> atualizar(
            @PathVariable Long id,
            @RequestBody AgendamentoRequest agendamentoRequest) {
    
        try {
            LocalDateTime dataInicialParsed = LocalDateTime.parse(agendamentoRequest.getDataInicial());
            LocalDateTime dataFinalParsed = LocalDateTime.parse(agendamentoRequest.getDataFinal());
    
            AgendamentoModel agendamento = agendamentoService.atualizar(
                id,
                agendamentoRequest.getId_cliente(),
                agendamentoRequest.getId_servico(),
                dataInicialParsed,
                dataFinalParsed,
                agendamentoRequest.getStatus()
            );
            return ResponseEntity.ok(agendamento);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            agendamentoService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}