package com.example.dgc.Servicos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/servicos")
public class ServicosController {

    @Autowired
    private ServicosService servicosService;

    @GetMapping
    public List<ServicosModel> getAllServicos() {
        return servicosService.getAllServicos();
    }

//    @PostMapping
//    public ServicosModel salvar(@RequestBody ServicosModel servico) {
//        return servicosService.salvar(servico);
//        }

    @PostMapping
    public ResponseEntity<ServicosModel> cadastrarServico(@RequestBody ServicosModel servico) {
        ServicosModel novoServico = servicosService.salvar(servico);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoServico);
    }
    @PutMapping("/{id_servico}")
    public ResponseEntity<ServicosModel> atualizar(@PathVariable Long id_servico, @RequestBody ServicosModel servico) {
    return servicosService.atualizar(id_servico, servico);
    }

    @DeleteMapping("/{id_servico}")
    public ResponseEntity<Void> deletar(@PathVariable Long id_servico) {
    servicosService.deletar(id_servico);
    return ResponseEntity.noContent().build();
    }
    }