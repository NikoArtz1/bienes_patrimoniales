package com.iosepbp.bienes_patrimoniales.DTO;

import jakarta.validation.constraints.NotBlank;

public class CrearUbicacionRequest {

    @NotBlank
    public String cod_ubicacion_bien;

    @NotBlank
    public String desc_ubicacion_bien;

    public CrearUbicacionRequest() {}

    public CrearUbicacionRequest(String cod_ubicacion_bien, String desc_ubicacion_bien) {
        this.cod_ubicacion_bien = cod_ubicacion_bien;
        this.desc_ubicacion_bien = desc_ubicacion_bien;
    }
}