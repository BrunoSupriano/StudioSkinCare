package com.example.dgc.Agendamento;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.dgc.Clientes.ClientModel;

public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {
    
    List<AgendamentoModel> findByDataHora(LocalDateTime dataHora);

    List<AgendamentoModel> findByCliente(ClientModel cliente);
    
    // Corrigido para usar o objeto ServicosModel
    List<AgendamentoModel> findByServico(com.example.dgc.Servicos.ServicosModel servico);
    
    // Corrigido para usar o objeto ClientModel
    List<AgendamentoModel> findByClienteAndDataHora(ClientModel cliente, LocalDateTime dataHora);
    
    // Corrigido para usar o objeto ServicosModel
    List<AgendamentoModel> findByServicoAndDataHora(com.example.dgc.Servicos.ServicosModel servico, LocalDateTime dataHora);
}