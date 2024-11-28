package com.example.dgc.Agendamento;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.dgc.Clientes.ClientModel;
import com.example.dgc.Servicos.ServicosModel;

public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {
    List<AgendamentoModel> findByDataInicial(LocalDateTime dataInicial);
    
    List<AgendamentoModel> findByCliente(ClientModel cliente);

    @Query("SELECT a FROM AgendamentoModel a JOIN a.servicos s WHERE s = :servico")
    List<AgendamentoModel> findByServico(@Param("servico") ServicosModel servico);

    List<AgendamentoModel> findByClienteAndDataInicial(ClientModel cliente, LocalDateTime dataInicial);

    @Query("SELECT a FROM AgendamentoModel a JOIN a.servicos s WHERE s = :servico AND a.dataInicial = :dataInicial")
    List<AgendamentoModel> findByServicoAndDataInicial(@Param("servico") ServicosModel servico, @Param("dataInicial") LocalDateTime dataInicial);

    @Query("SELECT a FROM AgendamentoModel a JOIN a.servicos s WHERE s IN :servicos")
    List<AgendamentoModel> findByServicos(@Param("servicos") List<ServicosModel> servicos);

    @Query("SELECT a FROM AgendamentoModel a JOIN a.servicos s WHERE s IN :servicos AND a.dataInicial BETWEEN :dataInicial AND :dataFinal")
    List<AgendamentoModel> findByServicosAndDataBetween(@Param("servicos") List<ServicosModel> servicos, @Param("dataInicial") LocalDateTime dataInicial, @Param("dataFinal") LocalDateTime dataFinal);
}
