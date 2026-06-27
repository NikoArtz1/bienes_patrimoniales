package com.iosepbp.bienes_patrimoniales.Modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "ubicacion_bien")
public class Ubicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_ubicacion_bien;

    @Size(min = 1, max = 10)
    @Column(nullable = false, length = 10)
    private String cod_ubicacion_bien;

    @Size(min = 1, max = 40)
    @Column(nullable = true, length = 40)
    private String desc_ubicacion_bien;

    //SETTERS & GETTERS
    //id_ubicacion_bien (no se usa)
    public void setId_ubicacion_bien(Integer id_ubicacion_bien){
        this.id_ubicacion_bien = id_ubicacion_bien;
    }

    public Integer getId_ubicacion_bien(){
        return (Integer) this.id_ubicacion_bien;
    }

    //cod_ubicacion_bien
    public void setCod_ubicacion_bien(String cod_ubicacion_bien){
        this.cod_ubicacion_bien = cod_ubicacion_bien;
    }
    public String getCod_ubicacion_bien(){
        return this.cod_ubicacion_bien;
    }

    //desc_ubicacion_bien
    public void setDesc_ubicacion_bien(String desc_ubicacion_bien){
        this.desc_ubicacion_bien = desc_ubicacion_bien;
    }
    public String getDesc_ubicacion_bien(){
        return desc_ubicacion_bien;
    }
}
