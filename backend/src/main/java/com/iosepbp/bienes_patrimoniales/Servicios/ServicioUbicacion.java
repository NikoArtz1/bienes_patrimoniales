package com.iosepbp.bienes_patrimoniales.Servicios;

import com.iosepbp.bienes_patrimoniales.Modelos.Ubicacion;
import com.iosepbp.bienes_patrimoniales.Repositorios.RepositorioUbicacion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioUbicacion {

    private final RepositorioUbicacion repositorioUbicacion;

    public ServicioUbicacion(RepositorioUbicacion repositorioUbicacion) {
        this.repositorioUbicacion = repositorioUbicacion;
    }

    public List<Ubicacion> listarUbicaciones() {
        return repositorioUbicacion.findAll();
    }

    public Ubicacion buscarPorId(Integer id) {
        return repositorioUbicacion.findById(id)
                .orElseThrow(() -> new RuntimeException("Ubicacion no encontrada con id: " + id));
    }

    public Ubicacion crearUbicacion(String cod_ubicacion_bien, String desc_ubicacion_bien) {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCod_ubicacion_bien(cod_ubicacion_bien);
        ubicacion.setDesc_ubicacion_bien(desc_ubicacion_bien);
        return repositorioUbicacion.save(ubicacion);
    }

    public Ubicacion actualizarUbicacion(Integer id, String cod_ubicacion_bien, String desc_ubicacion_bien) {
        Ubicacion ubicacion = buscarPorId(id);
        ubicacion.setCod_ubicacion_bien(cod_ubicacion_bien);
        ubicacion.setDesc_ubicacion_bien(desc_ubicacion_bien);
        return repositorioUbicacion.save(ubicacion);
    }

}