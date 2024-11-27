package com.example.dgc.Financeiro;

import java.time.LocalDateTime;

import com.example.dgc.Agendamento.AgendamentoModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "financeiro")
public class Financeiro {

    @Id
    @Column(name = "id_financeiro")
    private Integer idFinanceiro;

    @ManyToOne
    @JoinColumn(name = "id_agenda", insertable = false, updatable = false) // Evitar conflito
    private AgendamentoModel agenda;

    public AgendamentoModel getAgenda() {
        return agenda;
    }

    public void setAgenda(AgendamentoModel agenda) {
        this.agenda = agenda;
    }

    @Column(name = "id_agenda")
    private Integer idAgenda;

    @Column(name = "valor")
    private Double valor;

    @Column(name = "data_pagamento")
    private LocalDateTime dataPagamento;

    @Column(name = "forma_pagamento")
    private String formaPagamento;

    @Column(name = "status")
    private String status;

    @Column(name = "data")
    private LocalDateTime data;

    public Integer getIdFinanceiro() {
        return idFinanceiro;
    }

    public void setIdFinanceiro(Integer idFinanceiro) {
        this.idFinanceiro = idFinanceiro;
    }

    public Integer getIdAgenda() {
        return idAgenda;
    }

    public void setIdAgenda(Integer idAgenda) {
        this.idAgenda = idAgenda;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public LocalDateTime getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(LocalDateTime dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }
}
