package com.example.dgc.Clientes;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        clienteExistente.setTelefone(cliente.getTelefone());
        clienteExistente.setEndereco(cliente.getEndereco());
        clienteExistente.setCpf(cliente.getCpf());
        clienteExistente.setNascimento(cliente.getNascimento());
        return clienteRepository.save(clienteExistente);
    }

    public void deletar(Long id) {
        clienteRepository.deleteById(id);
    }

    public Optional<ClientModel> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }
    
}
