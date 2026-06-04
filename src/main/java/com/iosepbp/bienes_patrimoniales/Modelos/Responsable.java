package com.iosepbp.bienes_patrimoniales.Modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "responsable")
public class Responsable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_responsable;

    @Size(min = 1, max = 10)
    @Column(nullable = false, length = 10)
    private String cod_responsable;

    @Size(min = 1, max = 10)
    @Column(nullable = false, length = 60)
    private String desc_responsable;

    //SETTERS & GETTERS
    //id_responsable (no se usa)
    public void setId_responsable(Integer id_responsable){
        this.id_responsable = id_responsable;
    }

    public Integer getId_responsable(){
        return this.id_responsable;
    }

    //cod_responsable
    public void setCod_responsable(String cod_responsable){
        this.cod_responsable = cod_responsable;
    }
    public String getCod_responsable(){
        return this.cod_responsable;
    }

    //desc_responsable
    public void setDesc_responsable(String desc_responsable){
        this.desc_responsable = desc_responsable;
    }
    public String getDesc_responsable(){
        return desc_responsable;
    }
}
