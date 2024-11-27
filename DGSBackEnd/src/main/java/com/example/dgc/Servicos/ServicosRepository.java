package com.example.dgc.Servicos;
import com.example.dgc.Clientes.ClientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServicosRepository extends JpaRepository<ServicosModel, Long> {
}