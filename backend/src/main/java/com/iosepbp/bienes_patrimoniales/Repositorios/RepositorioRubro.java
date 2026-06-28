package com.iosepbp.bienes_patrimoniales.Repositorios;

import com.iosepbp.bienes_patrimoniales.Modelos.Rubro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioRubro extends JpaRepository<Rubro, Integer>{
}
