package com.iosepbp.bienes_patrimoniales.Repositorios;

import com.iosepbp.bienes_patrimoniales.Modelos.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioDepartamento extends JpaRepository<Departamento, Integer>{
}
