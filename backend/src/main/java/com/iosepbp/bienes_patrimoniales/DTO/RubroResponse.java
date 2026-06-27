package com.iosepbp.bienes_patrimoniales.DTO;

public class RubroResponse {

    Integer id_rubro_bien;

    String cod_rubro_bien;

    String desc_rubro_bien;

    public RubroResponse() {}

    // id_rubro_bien
    public void setId_rubro_bien(Integer id_rubro_bien) {
        this.id_rubro_bien = id_rubro_bien;
    }
    public Integer getId_rubro_bien() {
        return this.id_rubro_bien;
    }

    // cod_rubro_bien
    public void setCod_rubro_bien(String cod_rubro_bien) {
        this.cod_rubro_bien = cod_rubro_bien;
    }
    public String getCod_rubro_bien() {
        return this.cod_rubro_bien;
    }

    // desc_rubro_bien
    public void setDesc_rubro_bien(String desc_rubro_bien) {
        this.desc_rubro_bien = desc_rubro_bien;
    }
    public String getDesc_rubro_bien() {
        return this.desc_rubro_bien;
    }
}