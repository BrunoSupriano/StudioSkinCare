package com.example.dgc.Clientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clienteRepository;

    public List<ClientModel> listarTodos() {
        return clienteRepository.findAll();
    }

    public ClientModel salvar(ClientModel cliente) {
        return clienteRepository.save(cliente);
    }

    public ClientModel atualizar(Long id, ClientModel cliente) {
        ClientModel clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        clienteExistente.setNome(cliente.getNome());
        clienteExistente.setCelular(cliente.getCelular());
        clienteExistente.setEndereco(cliente.getEndereco());
        clienteExistente.setCpf(cliente.getCpf());
        clienteExistente.setAniversario(cliente.getAniversario());
        return clienteRepository.save(clienteExistente);
    }

    public void deletar(Long id) {
        clienteRepository.deleteById(id);
    }
}
