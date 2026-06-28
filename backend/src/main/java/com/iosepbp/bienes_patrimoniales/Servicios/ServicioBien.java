package com.iosepbp.bienes_patrimoniales.Servicios;

import com.iosepbp.bienes_patrimoniales.Modelos.*;
import com.iosepbp.bienes_patrimoniales.Repositorios.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServicioBien {

    private final RepositorioBien repositorioBien;
    private final RepositorioDepartamento repositorioDepartamento;
    private final RepositorioResponsable repositorioResponsable;
    private final RepositorioRubro repositorioRubro;
    private final RepositorioTipo repositorioTipo;
    private final RepositorioUbicacion repositorioUbicacion;


    public ServicioBien(
            RepositorioBien repositorioBien,
            RepositorioDepartamento repositorioDepartamento,
            RepositorioResponsable repositorioResponsable,
            RepositorioRubro repositorioRubro,
            RepositorioTipo repositorioTipo,
            RepositorioUbicacion repositorioUbicacion
    ){
        this.repositorioBien = repositorioBien;
        this.repositorioDepartamento = repositorioDepartamento;
        this.repositorioResponsable = repositorioResponsable;
        this.repositorioRubro = repositorioRubro;
        this.repositorioTipo = repositorioTipo;
        this.repositorioUbicacion = repositorioUbicacion;
    }

    public Bien crearBien(
            String cod_bien,
            String desc_bien,
            String desc_detallada,
            Integer id_rubro,
            Integer id_tipo,
            Integer id_departamento,
            Integer id_responsable,
            Integer id_ubicacion,
            LocalDateTime fecha_alta,
            String moneda,
            Double valor_moneda
    ){
        Rubro rubro = repositorioRubro.findById(id_rubro)
                .orElseThrow();

        Tipo tipo = repositorioTipo.findById(id_tipo)
                .orElseThrow();

        Departamento departamento = repositorioDepartamento.findById(id_departamento)
                .orElseThrow();

        Responsable responsable = repositorioResponsable.findById(id_responsable)
                .orElseThrow();

        Ubicacion ubicacion = repositorioUbicacion.findById(id_ubicacion)
                .orElseThrow();

        Bien nuevoBien = new Bien(
                cod_bien,
                desc_bien,
                desc_detallada,
                rubro,
                tipo,
                departamento,
                responsable,
                ubicacion,
                fecha_alta,
                moneda,
                valor_moneda
        );

        return repositorioBien.save(nuevoBien);
    }

    public List<Bien> listarBienes(){
        return repositorioBien.findAll();
    }
}
