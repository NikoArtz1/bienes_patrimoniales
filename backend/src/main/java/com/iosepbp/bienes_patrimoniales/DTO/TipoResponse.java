package com.iosepbp.bienes_patrimoniales.DTO;

public class TipoResponse {

    Integer id_tipo_bien;

    String cod_tipo_bien;

    String desc_tipo_bien;

    public TipoResponse() {}

    // id_tipo_bien
    public void setId_tipo_bien(Integer id_tipo_bien) {
        this.id_tipo_bien = id_tipo_bien;
    }
    public Integer getId_tipo_bien() {
        return this.id_tipo_bien;
    }

    // cod_tipo_bien
    public void setCod_tipo_bien(String cod_tipo_bien) {
        this.cod_tipo_bien = cod_tipo_bien;
    }
    public String getCod_tipo_bien() {
        return this.cod_tipo_bien;
    }

    // desc_tipo_bien
    public void setDesc_tipo_bien(String desc_tipo_bien) {
        this.desc_tipo_bien = desc_tipo_bien;
    }
    public String getDesc_tipo_bien() {
        return this.desc_tipo_bien;
    }
}