package com.example.dgc.Agendamento;

import com.example.dgc.Clientes.ClientModel;
import com.example.dgc.Servicos.ServicosModel;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "agendamento")
public class AgendamentoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id_cliente")
    private ClientModel cliente;

    @ManyToMany
    @JoinTable(
        name = "agendamento_servico", 
        joinColumns = @JoinColumn(name = "id_agendamento"), 
        inverseJoinColumns = @JoinColumn(name = "id_servico")
    )
    private List<ServicosModel> servicos;

    private LocalDateTime dataInicial;
    private LocalDateTime dataFinal;
    private Integer status;

    // Getters e Setters
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

    public List<ServicosModel> getServicos() {
        return servicos;
    }

    public void setServicos(List<ServicosModel> servicos) {
        this.servicos = servicos;
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
