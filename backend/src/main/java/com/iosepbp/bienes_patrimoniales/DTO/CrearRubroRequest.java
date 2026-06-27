package com.iosepbp.bienes_patrimoniales.DTO;

import jakarta.validation.constraints.NotBlank;

public class CrearRubroRequest {

    @NotBlank
    public String cod_rubro_bien;

    @NotBlank
    public String desc_rubro_bien;

    public CrearRubroRequest() {}

    public CrearRubroRequest(String cod_rubro_bien, String desc_rubro_bien) {
        this.cod_rubro_bien = cod_rubro_bien;
        this.desc_rubro_bien = desc_rubro_bien;
    }
}