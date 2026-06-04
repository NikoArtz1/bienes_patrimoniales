package com.iosepbp.bienes_patrimoniales.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class CrearBienRequest {
    public Integer id_bien;

    @NotBlank
    public String cod_bien;

    @NotBlank
    public String desc_bien;

    @NotBlank
    public String desc_detallada;


    public Integer id_rubro_bien;


    public  Integer id_tipo_bien;


    public Integer id_departamento;


    public  Integer id_responsable;


    public Integer id_ubicacion;

    @NotNull
    public LocalDateTime fecha_alta;

    @NotBlank
    public String moneda;

    @NotNull
    public  Double valor_moneda;

    public CrearBienRequest(){}

    public CrearBienRequest(
            Integer id_bien,
            String cod_bien,
            String desc_bien,
            String desc_detallada,
            Integer rubro,
            Integer tipo,
            Integer departamento,
            Integer responsable,
            Integer ubicacion,
            LocalDateTime fecha_alta,
            String moneda,
            Double valor_moneda
    ){
        this.id_bien = id_bien;
        this.cod_bien = cod_bien;
        this.desc_bien = desc_bien;
        this.desc_detallada = desc_detallada;
        this.id_rubro_bien = rubro;
        this.id_tipo_bien = tipo;
        this.id_departamento = departamento;
        this.id_departamento = responsable;
        this.id_ubicacion = ubicacion;
        this.fecha_alta = fecha_alta;
        this.moneda = moneda;
        this.valor_moneda = valor_moneda;
    }
}
