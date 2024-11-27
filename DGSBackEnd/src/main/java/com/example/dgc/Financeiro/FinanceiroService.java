package com.example.dgc.Financeiro;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinanceiroService {

    @Autowired
    private FinanceiroRepository repository;

    public List<FinanceiroDTO> getAllFinanceiroWithClientName() {
        return repository.findFinanceiroWithClientName().stream()
            .map(obj -> {
                Financeiro financeiro = (Financeiro) obj[0];
                String nomeCliente = (String) obj[1];
                return new FinanceiroDTO(financeiro, nomeCliente);
            })
            .collect(Collectors.toList());
    }    

}