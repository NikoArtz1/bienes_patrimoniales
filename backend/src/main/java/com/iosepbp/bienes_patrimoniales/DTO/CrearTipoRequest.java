package com.iosepbp.bienes_patrimoniales.DTO;

import jakarta.validation.constraints.NotBlank;

public class CrearTipoRequest {

    @NotBlank
    public String cod_tipo_bien;

    @NotBlank
    public String desc_tipo_bien;

    public CrearTipoRequest() {}

    public CrearTipoRequest(String cod_tipo_bien, String desc_tipo_bien) {
        this.cod_tipo_bien = cod_tipo_bien;
        this.desc_tipo_bien = desc_tipo_bien;
    }
}