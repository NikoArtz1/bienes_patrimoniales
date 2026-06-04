package com.iosepbp.bienes_patrimoniales.Modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tipo_bien")
public class Tipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_tipo_bien;

    @Size(min = 1, max = 10)
    @Column(nullable = false, length = 10)
    private String cod_tipo_bien;

    @Size(min = 1, max = 40)
    @Column(nullable = true, length = 40)
    private String desc_tipo_bien;

    //SETTERS & GETTERS
    //id_tipo_bien (no se usa)
    public void setId_tipo_bien(Integer id_tipo_bien){
        this.id_tipo_bien = id_tipo_bien;
    }

    public Integer getId_tipo_bien(){
        return this.id_tipo_bien;
    }

    //cod_tipo_bien
    public void setCod_tipo_bien(String cod_tipo_bien){
        this.cod_tipo_bien = cod_tipo_bien;
    }

    public String getCod_tipo_bien(){
        return this.cod_tipo_bien;
    }

    //desc_tipo_bien
    public void setDesc_tipo_bien(String desc_tipo_bien){
        this.desc_tipo_bien = desc_tipo_bien;
    }

    public String getDesc_tipo_bien(){
        return this.desc_tipo_bien;
    }
}
