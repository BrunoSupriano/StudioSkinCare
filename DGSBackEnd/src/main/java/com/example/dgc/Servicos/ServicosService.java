package com.example.dgc.Servicos;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@Service
public class ServicosService {

    @Autowired
    private ServicosRepository servicosRepository;

    public List<ServicosModel> getAllServicos() {
        return servicosRepository.findAll();
    }

    public ServicosModel salvar(ServicosModel servico) {
        return servicosRepository.save(servico);
    }

    public ResponseEntity<ServicosModel> atualizar(Long id, ServicosModel servico) {
        Optional<ServicosModel> optionalServico = servicosRepository.findById(id);
        if (optionalServico.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ServicosModel existingServico = optionalServico.get();
        existingServico.setNome(servico.getNome());
        existingServico.setDuracao(servico.getDuracao());
        existingServico.setValor(servico.getValor());
        ServicosModel updatedServico = servicosRepository.save(existingServico);
        return ResponseEntity.ok(updatedServico);
    }


    public void deletar(Long id) {
        servicosRepository.deleteById(id);
    }

}