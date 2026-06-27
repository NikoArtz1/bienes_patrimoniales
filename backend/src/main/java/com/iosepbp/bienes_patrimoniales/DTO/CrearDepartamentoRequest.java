package com.iosepbp.bienes_patrimoniales.DTO;

import jakarta.validation.constraints.NotBlank;

public class CrearDepartamentoRequest {

    @NotBlank
    public String cod_departamento;

    @NotBlank
    public String desc_departamento;

    public CrearDepartamentoRequest() {}

    public CrearDepartamentoRequest(String cod_departamento, String desc_departamento) {
        this.cod_departamento = cod_departamento;
        this.desc_departamento = desc_departamento;
    }
}