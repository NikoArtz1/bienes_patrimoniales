package com.iosepbp.bienes_patrimoniales.DTO;

public class DepartamentoResponse {

    Integer id_departamento;

    String cod_departamento;

    String desc_departamento;

    public DepartamentoResponse() {}

    // id_departamento
    public void setId_departamento(Integer id_departamento) {
        this.id_departamento = id_departamento;
    }
    public Integer getId_departamento() {
        return this.id_departamento;
    }

    // cod_departamento
    public void setCod_departamento(String cod_departamento) {
        this.cod_departamento = cod_departamento;
    }
    public String getCod_departamento() {
        return this.cod_departamento;
    }

    // desc_departamento
    public void setDesc_departamento(String desc_departamento) {
        this.desc_departamento = desc_departamento;
    }
    public String getDesc_departamento() {
        return this.desc_departamento;
    }
}