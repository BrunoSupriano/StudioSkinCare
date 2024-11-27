package com.example.dgc.Financeiro;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/financeiro")
@CrossOrigin(origins = "http://localhost:3000")
public class FinanceiroController {
    @Autowired
    private FinanceiroService service;

    @GetMapping
    public List<FinanceiroDTO> getAllFinanceiro() {
        return service.getAllFinanceiroWithClientName();
    }
}
