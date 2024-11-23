package com.example.dgc.Agendamento;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<?> agendar(@RequestBody AgendamentoRequest agendamentoRequest) {
        LocalDateTime localDateTime;
        try {
            localDateTime = LocalDateTime.parse(agendamentoRequest.getDataHora());
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data/hora inválido");
        }

        try {
            AgendamentoModel agendamento = agendamentoService.agendar(
                agendamentoRequest.getId_cliente(),
                agendamentoRequest.getId_servico(),
                localDateTime
            );
            return ResponseEntity.ok(agendamento);
        } catch (AgendamentoException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro interno do servidor");
        }
    }

    
    public class AgendamentoException extends RuntimeException {
        public AgendamentoException(String message) {
            super(message);
        }
    }

    @GetMapping
    public List<AgendamentoModel> listarTodos() {
        return agendamentoService.listarTodos();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoModel> atualizar(
            @PathVariable Long id,
            @RequestParam Long id_cliente,
            @RequestParam Long id_servico,
            @RequestParam String dataHora) {

        LocalDateTime localDateTime = LocalDateTime.parse(dataHora);

        try {
            AgendamentoModel agendamento = agendamentoService.atualizar(id, id_cliente, id_servico, localDateTime);
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
