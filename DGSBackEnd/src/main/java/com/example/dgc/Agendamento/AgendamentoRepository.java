package com.example.dgc.Agendamento;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.dgc.Clientes.ClientModel;

public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {
    List<AgendamentoModel> findByDataInicial(LocalDateTime dataInicial);
    List<AgendamentoModel> findByCliente(ClientModel cliente);
    List<AgendamentoModel> findByServico(com.example.dgc.Servicos.ServicosModel servico);
    List<AgendamentoModel> findByClienteAndDataInicial(ClientModel cliente, LocalDateTime dataInicial);
    List<AgendamentoModel> findByServicoAndDataInicial(com.example.dgc.Servicos.ServicosModel servico, LocalDateTime dataInicial);
}