package com.example.dgc.Agendamento;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dgc.Clientes.ClientModel;
import com.example.dgc.Clientes.ClientService;
import com.example.dgc.Servicos.ServicosModel;
import com.example.dgc.Servicos.ServicosRepository;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ServicosRepository servicoRepository;

    @Autowired
    private ClientService clientService;

    public List<AgendamentoModel> agendar(Long id_cliente, List<Long> id_servicos, LocalDateTime dataInicial, 
    LocalDateTime dataFinal, Integer status) {
        Optional<ClientModel> cliente = clientService.buscarPorId(id_cliente);
        if (cliente.isEmpty()) {
            throw new RuntimeException("Cliente não encontrado");
        }

        List<AgendamentoModel> agendamentosCriados = new ArrayList<>();
        List<ServicosModel> servicos = new ArrayList<>();

        // Iterar sobre a lista de serviços e buscar todos os serviços
        for (Long idServico : id_servicos) {
            Optional<ServicosModel> servico = servicoRepository.findById(idServico);
            if (servico.isEmpty()) {
                throw new RuntimeException("Serviço não encontrado");
            }
            servicos.add(servico.get());
        }

        // Verificar se já existe um agendamento para o mesmo horário
        List<AgendamentoModel> agendamentos = agendamentoRepository.findByDataInicial(dataInicial);
        if (!agendamentos.isEmpty()) {
            throw new RuntimeException("Horário já agendado");
        }

        // Criar um agendamento com múltiplos serviços
        AgendamentoModel agendamento = new AgendamentoModel();
        agendamento.setCliente(cliente.get());
        agendamento.setServicos(servicos); // Agora é uma lista de serviços
        agendamento.setDataInicial(dataInicial);
        agendamento.setDataFinal(dataFinal);
        agendamento.setStatus(status);

        agendamentosCriados.add(agendamentoRepository.save(agendamento));

        return agendamentosCriados;  // Retorna todos os agendamentos criados
    }

    public List<AgendamentoModel> listarTodos() {
        return agendamentoRepository.findAll();
    }

    public AgendamentoModel atualizar(Long id, Long id_cliente, List<Long> id_servicos, LocalDateTime dataInicial, LocalDateTime dataFinal, Integer status) {
        Optional<AgendamentoModel> agendamentoExistente = agendamentoRepository.findById(id);
    
        if (agendamentoExistente.isEmpty()) {
            throw new RuntimeException("Agendamento não encontrado");
        }
    
        Optional<ClientModel> cliente = clientService.buscarPorId(id_cliente);
        if (cliente.isEmpty()) {
            throw new RuntimeException("Cliente não encontrado");
        }
    
        List<AgendamentoModel> agendamentos = agendamentoRepository.findByDataInicial(dataInicial)
            .stream()
            .filter(a -> !a.getId().equals(id))
            .toList();
            
        if (!agendamentos.isEmpty()) {
            throw new RuntimeException("Horário já agendado");
        }
    
        AgendamentoModel agendamento = agendamentoExistente.get();
        agendamento.setCliente(cliente.get());
        agendamento.setDataInicial(dataInicial);
        agendamento.setDataFinal(dataFinal);
        agendamento.setStatus(status);

        // Atualizar todos os serviços com base nos IDs fornecidos
        List<ServicosModel> servicos = new ArrayList<>();
        for (Long idServico : id_servicos) {
            Optional<ServicosModel> servico = servicoRepository.findById(idServico);
            if (servico.isEmpty()) {
                throw new RuntimeException("Serviço não encontrado");
            }
            servicos.add(servico.get());
        }
        agendamento.setServicos(servicos);

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
