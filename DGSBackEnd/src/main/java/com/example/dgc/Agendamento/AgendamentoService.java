package com.example.dgc.Agendamento;

import com.example.dgc.Clientes.ClientModel;
import com.example.dgc.Clientes.ClientService;
import com.example.dgc.Servicos.ServicosModel;
import com.example.dgc.Servicos.ServicosRepository;

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
    private ServicosRepository servicoRepository;

    @Autowired
    private ClientService clientService;

    public AgendamentoModel agendar(Long id_cliente, Long id_servico, LocalDateTime dataHora) {
        Optional<ClientModel> cliente = clientService.buscarPorId(id_cliente);
        Optional<ServicosModel> servico = servicoRepository.findById(id_servico);

        if (cliente.isEmpty() || servico.isEmpty()) {
            throw new RuntimeException("Cliente ou Serviço não encontrado");
        }

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

    public List<AgendamentoModel> listarTodos() {
        return agendamentoRepository.findAll();
    }

    public AgendamentoModel atualizar(Long id, Long id_cliente, Long id_servico, LocalDateTime dataHora) {
        Optional<AgendamentoModel> agendamentoExistente = agendamentoRepository.findById(id);

        if (agendamentoExistente.isEmpty()) {
            throw new RuntimeException("Agendamento não encontrado");
        }

        Optional<ClientModel> cliente = clientService.buscarPorId(id_cliente);
        Optional<ServicosModel> servico = servicoRepository.findById(id_servico);

        if (cliente.isEmpty() || servico.isEmpty()) {
            throw new RuntimeException("Cliente ou Serviço não encontrado");
        }

        List<AgendamentoModel> agendamentos = agendamentoRepository.findByDataHora(dataHora);
        if (!agendamentos.isEmpty()) {
            throw new RuntimeException("Horário já agendado");
        }

        AgendamentoModel agendamento = agendamentoExistente.get();
        agendamento.setCliente(cliente.get());
        agendamento.setServico(servico.get());
        agendamento.setDataHora(dataHora);

        return agendamentoRepository.save(agendamento);
    }

    public void deletar(Long id) {
        Optional<AgendamentoModel> agendamentoExistente = agendamentoRepository.findById(id);

        if (agendamentoExistente.isEmpty()) {
            throw new RuntimeException("Agendamento não encontrado");
        }

        agendamentoRepository.deleteById(id);
    }
}
