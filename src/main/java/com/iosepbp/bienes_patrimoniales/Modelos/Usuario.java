package com.iosepbp.bienes_patrimoniales.Modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer usuario_id;

    @Size(min = 8, max = 60)
    @Column(nullable = false, length = 60)
    private String nombre_completo;

    @Size(min = 8, max = 60)
    @Column(name = "nombre_usuario", nullable = false, length = 60)
    private String nombreUsuario;

    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String contraseña;

    public void setUsuario_id(Integer usuario_id){
        this.usuario_id = usuario_id;
    }
    public Integer getUsuario_id(){
        return this.usuario_id;
    }

    public void setNombre_completo(String nombre_completo){
        this.nombre_completo = nombre_completo;
    }

    public String getNombre_completo(){
        return this.nombre_completo;
    }

    public void setNombreUsuario(String nombreUsuario){
        this.nombreUsuario = nombreUsuario;
    }

    public String getNombreUsuario(){
        return nombreUsuario;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getContraseña(){
        return this.contraseña;
    }
}
