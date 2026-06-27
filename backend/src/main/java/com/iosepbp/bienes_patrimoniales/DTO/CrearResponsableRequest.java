package com.iosepbp.bienes_patrimoniales.DTO;

import jakarta.validation.constraints.NotBlank;

public class CrearResponsableRequest {

    @NotBlank
    public String cod_responsable;

    @NotBlank
    public String desc_responsable;

    public CrearResponsableRequest() {}

    public CrearResponsableRequest(String cod_responsable, String desc_responsable) {
        this.cod_responsable = cod_responsable;
        this.desc_responsable = desc_responsable;
    }
}