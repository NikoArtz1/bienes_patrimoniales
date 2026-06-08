package com.iosepbp.bienes_patrimoniales.Seguridad;

import com.iosepbp.bienes_patrimoniales.Modelos.*;
import com.iosepbp.bienes_patrimoniales.Repositorios.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.*;

@Service
public class UsuarioDetailsService implements UserDetailsService{
    private final RepositorioUsuario repositorioUsuario;

    public UsuarioDetailsService(RepositorioUsuario repositorioUsuario){
        this.repositorioUsuario = repositorioUsuario;
    }

    @Override
    public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
        Usuario usuario = repositorioUsuario.findByNombreUsuario(nombreUsuario)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Usuario '" + nombreUsuario + "' no encontrado"
                ));

        return User.builder()
                .username(usuario.getNombreUsuario())
                .password(usuario.getContraseña())
                .roles("USER")
                .build();
    }
}
