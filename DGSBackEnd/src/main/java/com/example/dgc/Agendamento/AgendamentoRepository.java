package com.example.dgc.Agendamento;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {
    
    List<AgendamentoModel> findByDataHora(LocalDateTime dataHora);
    
    List<AgendamentoModel> findByid_cliente(Long id_cliente);
    
    List<AgendamentoModel> findByServicoId(Long servicoId);
    
    List<AgendamentoModel> findByid_clienteAndDataHora(Long id_cliente, LocalDateTime dataHora);
    
    List<AgendamentoModel> findByServicoIdAndDataHora(Long servicoId, LocalDateTime dataHora);
}
