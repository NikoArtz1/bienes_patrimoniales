package com.iosepbp.bienes_patrimoniales.Modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bien")
public class Bien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_bien;

    @Size(min = 1, max = 20)
    @Column(nullable = false, length = 20)
    private String cod_bien;

    @Size(min = 1, max = 60)
    @Column(length = 60)
    private String desc_bien;

    @Size(min = 1, max = 1000)
    @Column(length = 1000)
    private String desc_detallada;

    @ManyToOne
    @JoinColumn(name = "id_rubro_bien", nullable = true)
    private Rubro rubro;

    @ManyToOne
    @JoinColumn(name = "id_tipo_bien", nullable = true)
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = true)
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "id_responsable", nullable = true)
    private Responsable responsable;

    @ManyToOne
    @JoinColumn(name = "id_ubicacion_bien", nullable = true)
    private Ubicacion ubicacion;

    @Column(nullable = false)
    private LocalDateTime fecha_alta;

    @Column
    private String moneda;

    @Column(nullable = false)
    public Double valor_moneda;

    public Bien(){}

    public Bien(
            String cod_bien,
            String desc_bien,
            String desc_detallada,
            Rubro rubro,
            Tipo tipo,
            Departamento departamento,
            Responsable responsable,
            Ubicacion ubicacion,
            LocalDateTime fecha_alta,
            String moneda,
            Double valor_moneda
    ){
        setCod_bien(cod_bien);
        setDesc_bien(desc_bien);
        setDesc_detallada(desc_detallada);
        setRubro(rubro);
        setTipo(tipo);
        setDepartamento(departamento);
        setResponsable(responsable);
        setUbicacion(ubicacion);
        setFecha_alta(fecha_alta);
        setMoneda(moneda);
        setValor_moneda(valor_moneda);
    }

    // SETTERS & GETTERS
    //id_bien (no se usa)
    public void setId_bien(Integer id_bien){
        this.id_bien = id_bien;
    }
    public Integer getId_bien(){
        return this.id_bien;
    }

    //cod_bien
    public void setCod_bien(String cod_bien){
        this.cod_bien = cod_bien;
    }

    public String getCod_bien(){
        return this.cod_bien;
    }

    //desc_bien

    public void setDesc_bien(String desc_bien){
        this.desc_bien = desc_bien;
    }

    public String getDesc_bien(){
        return this.desc_bien;
    }

    //desc_detallada
    public void setDesc_detallada(String desc_detallada){
        this.desc_detallada = desc_detallada;
    }

    public String getDesc_detallada(){
        return this.desc_detallada;
    }

    //rubro
    public void setRubro(Rubro rubro){
        this.rubro = rubro;
    }

    public Rubro getRubro(){
        return this.rubro;
    }

    //tipo
    public void setTipo(Tipo tipo){
        this.tipo = tipo;
    }

    public Tipo getTipo(){
        return this.tipo;
    }

    //departamento
    public void setDepartamento(Departamento departamento){
        this.departamento = departamento;
    }

    public Departamento getDepartamento(){
        return this.departamento;
    }

    //responsable
    public void setResponsable(Responsable responsable){
        this.responsable = responsable;
    }

    public Responsable getResponsable(){
        return this.responsable;
    }

    //ubicacion
    public void setUbicacion(Ubicacion ubicacion){
        this.ubicacion = ubicacion;
    }

    public Ubicacion getUbicacion(){
        return this.ubicacion;
    }

    //fecha_alta
    public void setFecha_alta(LocalDateTime fecha_alta){
        this.fecha_alta = fecha_alta;
    }

    public LocalDateTime getFecha_alta(){
        return this.fecha_alta;
    }

    //moneda
    public void setMoneda(String moneda){
        this.moneda = moneda;
    }

    public String getMoneda(){
        return this.moneda;
    }

    //valor_moneda
    public void setValor_moneda(Double valor_moneda){
        this.valor_moneda = valor_moneda;
    }

    public Double getValor_moneda(){
        return this.valor_moneda;
    }
}
