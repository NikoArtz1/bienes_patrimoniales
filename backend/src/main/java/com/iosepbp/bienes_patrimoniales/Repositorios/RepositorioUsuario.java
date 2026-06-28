package com.iosepbp.bienes_patrimoniales.Repositorios;

import com.iosepbp.bienes_patrimoniales.Modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioUsuario extends JpaRepository<Usuario, Integer>{
    Optional<Usuario> findByNombreUsuario(String nombre_usuario);
}
