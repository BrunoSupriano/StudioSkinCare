package com.example.dgc.Agendamentos;

import com.example.dgc.Clientes.ClientModel;
import com.example.dgc.Servicos.ServicoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ClientService clientService;

    // Método para criar um agendamento
    public AgendamentoModel agendar(Long clienteId, Long servicoId, LocalDateTime dataHora) {
        Optional<ClientModel> cliente = clientService.buscarPorId(clienteId);
        Optional<ServicoModel> servico = servicoRepository.findById(servicoId);

        if (cliente.isEmpty() || servico.isEmpty()) {
            throw new RuntimeException("Cliente ou Serviço não encontrado");
        }

        // Verificar se o horário já está agendado
        List<AgendamentoModel> agendamentos = agendamentoRepository.findByDataHora(dataHora);
        if (!agendamentos.isEmpty()) {
            throw new RuntimeException("Horário já agendado");
        }

        AgendamentoModel agendamento = new AgendamentoModel();
        agendamento.setCliente(cliente.get());
        agendamento.setServico(servico.get());
        agendamento.setDataHora(dataHora);

        return agendamentoRepository.save(agendamento);
    }

    // Método para listar todos os agendamentos
    public List<AgendamentoModel> listarTodos() {
        return agendamentoRepository.findAll();
    }
}