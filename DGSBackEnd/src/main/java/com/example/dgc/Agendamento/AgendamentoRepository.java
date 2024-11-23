package com.example.dgc.Agendamento;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {
    
    List<AgendamentoModel> findByDataHora(LocalDateTime dataHora);
    
    List<AgendamentoModel> findByidcliente(Long id_cliente);
    
    List<AgendamentoModel> findByIdServico(Long id_servico);
    
    List<AgendamentoModel> findByidclienteAndDataHora(Long id_cliente, LocalDateTime dataHora);
    
    List<AgendamentoModel> findByIdServicoAndDataHora(Long id_servico, LocalDateTime dataHora);
}
