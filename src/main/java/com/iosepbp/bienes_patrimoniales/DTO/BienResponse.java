package com.iosepbp.bienes_patrimoniales.DTO;

import com.iosepbp.bienes_patrimoniales.Modelos.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class BienResponse {
    Integer id_bien;

    @NotBlank
    String cod_bien;

    @NotBlank
    String desc_bien;

    @NotBlank
    String desc_detallada;


    Integer id_rubro_bien;


    Integer id_tipo_bien;


    Integer id_departamento;


    Integer id_responsable;


    Integer id_ubicacion;

    @NotNull
    LocalDateTime fecha_alta;

    @NotBlank
    String moneda;

    @NotNull
    Double valor_moneda;

    public BienResponse(){}

    // SETTERS & GETTERS
    //id_bien (no se usa)
    public void setId_bien(Integer id_bien){
        this.id_bien = id_bien;
    }
    public Integer getId_bien(){
        return this.id_bien;
    }

    //cod_bien
    public void setCod_bien(String cod_bien){
        this.cod_bien = cod_bien;
    }

    public String getCod_bien(){
        return this.cod_bien;
    }

    //desc_bien

    public void setDesc_bien(String desc_bien){
        this.desc_bien = desc_bien;
    }

    public String getDesc_bien(){
        return this.desc_bien;
    }

    //desc_detallada
    public void setDesc_detallada(String desc_detallada){
        this.desc_detallada = desc_detallada;
    }

    public String getDesc_detallada(){
        return this.desc_detallada;
    }

    //rubro
    public void setIdRubro(Integer id_rubro_bien){
        this.id_rubro_bien = id_rubro_bien;
    }

    public Integer getIdRubro(){
        return this.id_rubro_bien;
    }

    //tipo
    public void setId_tipo_bien(Integer id_tipo_bien){
        this.id_tipo_bien = id_tipo_bien;
    }

    public Integer getId_tipo_bien(){
        return this.id_tipo_bien;
    }

    //departamento
    public void setId_departamento(Integer id_departamento){
        this.id_departamento = id_departamento;
    }

    public Integer getId_departamento(){
        return this.id_departamento;
    }

    //responsable
    public void setId_responsable(Integer id_responsable){
        this.id_responsable = id_responsable;
    }

    public Integer getId_responsable(){
        return this.id_responsable;
    }

    //ubicacion
    public void setId_ubicacion(Integer id_ubicacion){
        this.id_ubicacion = id_ubicacion;
    }

    public Integer getId_ubicacion(){
        return this.id_ubicacion;
    }

    //fecha_alta
    public void setFecha_alta(LocalDateTime fecha_alta){
        this.fecha_alta = fecha_alta;
    }

    public LocalDateTime getFecha_alta(){
        return this.fecha_alta;
    }

    //moneda
    public void setMoneda(String moneda){
        this.moneda = moneda;
    }

    public String getMoneda(){
        return this.moneda;
    }

    //valor_moneda
    public void setValor_moneda(Double valor_moneda){
        this.valor_moneda = valor_moneda;
    }

    public Double getValor_moneda(){
        return this.valor_moneda;
    }
}
