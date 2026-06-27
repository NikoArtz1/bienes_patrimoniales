package com.iosepbp.bienes_patrimoniales.Modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "departamento")
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_departamento;

    @Size(min = 1, max = 10)
    @Column(nullable = false, length = 10)
    private String cod_departamento;

    @Size(min = 1, max = 10)
    @Column(nullable = false, length = 40)
    private String desc_departamento;

    //SETTERS & GETTERS
    //id_departamento (no se usa)
    public void setId_departamento(Integer id_departamento){
        this.id_departamento = id_departamento;
    }

    public Integer getId_departamento(){
        return (Integer) this.id_departamento;
    }

    //cod_departamento
    public void setCod_departamento(String cod_departamento){
        this.cod_departamento = cod_departamento;
    }
    public String getCod_departamento(){
        return this.cod_departamento;
    }

    //desc_departamento
    public void setDesc_departamento(String desc_departamento){
        this.desc_departamento = desc_departamento;
    }
    public String getDesc_departamento(){
        return desc_departamento;
    }
}
