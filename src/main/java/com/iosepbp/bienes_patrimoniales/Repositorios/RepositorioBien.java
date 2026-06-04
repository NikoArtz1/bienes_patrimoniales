package com.iosepbp.bienes_patrimoniales.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import com.iosepbp.bienes_patrimoniales.Modelos.Bien;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioBien extends JpaRepository<Bien, Integer>{
}
