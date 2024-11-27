package com.example.dgc.Financeiro;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceiroRepository extends JpaRepository<Financeiro, Integer> {
    @Query("SELECT f, a.cliente.nome FROM Financeiro f JOIN f.agenda a")
    List<Object[]> findFinanceiroWithClientName();

}