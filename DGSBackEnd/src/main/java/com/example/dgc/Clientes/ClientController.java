package com.example.dgc.Clientes;

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
import org.springframework.web.bind.annotation.RestController;

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
