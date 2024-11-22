package com.example.dgc.Agendamentos;

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
    public AgendamentoModel agendar(@RequestParam Long clienteId, @RequestParam Long servicoId, @RequestParam String dataHora) {
        LocalDateTime localDateTime = LocalDateTime.parse(dataHora);  // Exemplo de formato "2024-11-22T15:30:00"
        return agendamentoService.agendar(clienteId, servicoId, localDateTime);
    }

    @GetMapping
    public List<AgendamentoModel> listarTodos() {
        return agendamentoService.listarTodos();
    }
}