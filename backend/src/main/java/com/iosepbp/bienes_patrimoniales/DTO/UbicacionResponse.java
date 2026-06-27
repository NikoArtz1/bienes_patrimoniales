package com.iosepbp.bienes_patrimoniales.DTO;

public class UbicacionResponse {

    Integer id_ubicacion_bien;

    String cod_ubicacion_bien;

    String desc_ubicacion_bien;

    public UbicacionResponse() {}

    // id_ubicacion_bien
    public void setId_ubicacion_bien(Integer id_ubicacion_bien) {
        this.id_ubicacion_bien = id_ubicacion_bien;
    }
    public Integer getId_ubicacion_bien() {
        return this.id_ubicacion_bien;
    }

    // cod_ubicacion_bien
    public void setCod_ubicacion_bien(String cod_ubicacion_bien) {
        this.cod_ubicacion_bien = cod_ubicacion_bien;
    }
    public String getCod_ubicacion_bien() {
        return this.cod_ubicacion_bien;
    }

    // desc_ubicacion_bien
    public void setDesc_ubicacion_bien(String desc_ubicacion_bien) {
        this.desc_ubicacion_bien = desc_ubicacion_bien;
    }
    public String getDesc_ubicacion_bien() {
        return this.desc_ubicacion_bien;
    }
}