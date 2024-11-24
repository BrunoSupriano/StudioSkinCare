package com.example.dgc.Agendamento;

import java.time.LocalDateTime;

import com.example.dgc.Clientes.ClientModel;
import com.example.dgc.Servicos.ServicosModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "agenda")  // Alterado para usar a tabela agenda
public class AgendamentoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agenda")  // Alterado para id_agenda
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id_cliente")
    private ClientModel cliente;

    @ManyToOne
    @JoinColumn(name = "id_servico", referencedColumnName = "id_servico")
    private ServicosModel servico;

    @Column(name = "data_inicial")  // Alterado para usar data_inicial
    private LocalDateTime dataInicial;

    @Column(name = "data_final")    // Adicionado data_final
    private LocalDateTime dataFinal;

    @Column(name = "status")        // Adicionado status
    private Integer status;

    // Getters e Setters atualizados
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ClientModel getCliente() {
        return cliente;
    }

    public void setCliente(ClientModel cliente) {
        this.cliente = cliente;
    }

    public ServicosModel getServico() {
        return servico;
    }

    public void setServico(ServicosModel servico) {
        this.servico = servico;
    }

    public LocalDateTime getDataInicial() {
        return dataInicial;
    }

    public void setDataInicial(LocalDateTime dataInicial) {
        this.dataInicial = dataInicial;
    }

    public LocalDateTime getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(LocalDateTime dataFinal) {
        this.dataFinal = dataFinal;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}