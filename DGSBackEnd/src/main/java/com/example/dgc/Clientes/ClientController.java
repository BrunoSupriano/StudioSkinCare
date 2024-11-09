package com.example.dgc.Clientes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Ou o domínio do seu app Next.js
@RestController
@RequestMapping("/cliente")
public class ClientController {
    @Autowired
    private ClientService ClientService;

    @GetMapping
    public List<ClientModel> listarTodos() {
        return ClientService.listarTodos();
    }

    @PostMapping
    public ClientModel salvar(@RequestBody ClientModel cliente) {
        return ClientService.salvar(cliente);
    }

    @PutMapping("/{id}")
    public ClientModel atualizar(@PathVariable Long id, @RequestBody ClientModel cliente) {
        return ClientService.atualizar(id, cliente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        ClientService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
