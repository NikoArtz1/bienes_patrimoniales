package com.iosepbp.bienes_patrimoniales.Repositorios;

import com.iosepbp.bienes_patrimoniales.Modelos.Responsable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioResponsable extends JpaRepository<Responsable, Integer>{
}
