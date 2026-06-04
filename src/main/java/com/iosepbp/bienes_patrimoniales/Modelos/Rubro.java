package com.iosepbp.bienes_patrimoniales.Modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "rubro_bien")
public class Rubro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_rubro_bien;

    @Size(min = 1, max = 10)
    @Column(nullable = false, length = 10)
    private String cod_rubro_bien;

    @Size(min = 1, max = 60)
    @Column(nullable = true, length = 60)
    private String desc_rubro_bien;

    //SETTERS & GETTERS
    //id_rubro_bien (no se usa)
    public void setId_rubro_bien(Integer id_rubro_bien){
        this.id_rubro_bien = id_rubro_bien;
    }

    public Integer getId_rubro_bien(){
        return this.id_rubro_bien;
    }

    //cod_rubro_bien
    public void setCod_rubro_bien(String cod_rubro_bien){
        this.cod_rubro_bien = cod_rubro_bien;
    }

    public String getCod_rubro_bien(){
        return this.cod_rubro_bien;
    }

    //desc_rubro_bien
    public void setDesc_rubro_bien(String desc_rubro_bien){
        this.desc_rubro_bien = desc_rubro_bien;
    }

    public String getDesc_rubro_bien(){
        return this.desc_rubro_bien;
    }
}
