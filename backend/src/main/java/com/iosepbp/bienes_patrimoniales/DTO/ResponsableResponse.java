package com.iosepbp.bienes_patrimoniales.DTO;

public class ResponsableResponse {

    Integer id_responsable;

    String cod_responsable;

    String desc_responsable;

    public ResponsableResponse() {}

    // id_responsable
    public void setId_responsable(Integer id_responsable) {
        this.id_responsable = id_responsable;
    }
    public Integer getId_responsable() {
        return this.id_responsable;
    }

    // cod_responsable
    public void setCod_responsable(String cod_responsable) {
        this.cod_responsable = cod_responsable;
    }
    public String getCod_responsable() {
        return this.cod_responsable;
    }

    // desc_responsable
    public void setDesc_responsable(String desc_responsable) {
        this.desc_responsable = desc_responsable;
    }
    public String getDesc_responsable() {
        return this.desc_responsable;
    }
}