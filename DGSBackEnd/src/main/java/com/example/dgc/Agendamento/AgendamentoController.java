package com.example.dgc.Agendamento;

import com.example.dgc.Agendamento.AgendamentoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<AgendamentoModel> agendar(
            @RequestParam Long clienteId,
            @RequestParam Long servicoId,
            @RequestParam String dataHora) {

        LocalDateTime localDateTime = LocalDateTime.parse(dataHora);

        try {
            AgendamentoModel agendamento = agendamentoService.agendar(clienteId, servicoId, localDateTime);
            return ResponseEntity.ok(agendamento);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public List<AgendamentoModel> listarTodos() {
        return agendamentoService.listarTodos();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoModel> atualizar(
            @PathVariable Long id,
            @RequestParam Long clienteId,
            @RequestParam Long servicoId,
            @RequestParam String dataHora) {

        LocalDateTime localDateTime = LocalDateTime.parse(dataHora);

        try {
            AgendamentoModel agendamento = agendamentoService.atualizar(id, clienteId, servicoId, localDateTime);
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
