package com.example.dgc.Financeiro;

public class FinanceiroDTO {
    private Financeiro financeiro;
    private String nomeCliente;

public FinanceiroDTO() {
}

public FinanceiroDTO(Financeiro financeiro, String nomeCliente) {
    this.financeiro = financeiro;
    this.nomeCliente = nomeCliente;
}

public Financeiro getFinanceiro() {
    return financeiro;
}

public void setFinanceiro(Financeiro financeiro) {
    this.financeiro = financeiro;
}

public String getNomeCliente() {
    return nomeCliente;
}
@Override
public String toString() {
    return "FinanceiroDTO{" +
            "financeiro=" + financeiro +
            ", nomeCliente='" + nomeCliente + '\'' +
            '}';
}

public void setNomeCliente(String nomeCliente) {
    this.nomeCliente = nomeCliente;
}
}