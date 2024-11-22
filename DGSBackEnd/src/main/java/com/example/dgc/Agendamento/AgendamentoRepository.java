package com.example.dgc.Agendamento;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {
    
    List<AgendamentoModel> findByDataHora(LocalDateTime dataHora);
    
    List<AgendamentoModel> findByClienteId(Long clienteId);
    
    List<AgendamentoModel> findByServicoId(Long servicoId);
    
    List<AgendamentoModel> findByClienteIdAndDataHora(Long clienteId, LocalDateTime dataHora);
    
    List<AgendamentoModel> findByServicoIdAndDataHora(Long servicoId, LocalDateTime dataHora);
}
