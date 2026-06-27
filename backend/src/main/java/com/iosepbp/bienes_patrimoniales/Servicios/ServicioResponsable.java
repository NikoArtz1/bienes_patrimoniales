package com.iosepbp.bienes_patrimoniales.Servicios;

import com.iosepbp.bienes_patrimoniales.Modelos.Responsable;
import com.iosepbp.bienes_patrimoniales.Repositorios.RepositorioResponsable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioResponsable {

    private final RepositorioResponsable repositorioResponsable;

    public ServicioResponsable(RepositorioResponsable repositorioResponsable) {
        this.repositorioResponsable = repositorioResponsable;
    }

    public List<Responsable> listarResponsables() {
        return repositorioResponsable.findAll();
    }

    public Responsable buscarPorId(Integer id) {
        return repositorioResponsable.findById(id)
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado con id: " + id));
    }

    public Responsable crearResponsable(String cod_responsable, String desc_responsable) {
        Responsable responsable = new Responsable();
        responsable.setCod_responsable(cod_responsable);
        responsable.setDesc_responsable(desc_responsable);
        return repositorioResponsable.save(responsable);
    }

    public Responsable actualizarResponsable(Integer id, String cod_responsable, String desc_responsable) {
        Responsable responsable = buscarPorId(id);
        responsable.setCod_responsable(cod_responsable);
        responsable.setDesc_responsable(desc_responsable);
        return repositorioResponsable.save(responsable);
    }

}