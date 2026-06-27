package com.iosepbp.bienes_patrimoniales.Servicios;

import com.iosepbp.bienes_patrimoniales.Modelos.Rubro;
import com.iosepbp.bienes_patrimoniales.Repositorios.RepositorioRubro;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioRubro {

    private final RepositorioRubro repositorioRubro;

    public ServicioRubro(RepositorioRubro repositorioRubro) {
        this.repositorioRubro = repositorioRubro;
    }

    public List<Rubro> listarRubros() {
        return repositorioRubro.findAll();
    }

    public Rubro buscarPorId(Integer id) {
        return repositorioRubro.findById(id)
                .orElseThrow(() -> new RuntimeException("Rubro no encontrado con id: " + id));
    }

    public Rubro crearRubro(String cod_rubro_bien, String desc_rubro_bien) {
        Rubro rubro = new Rubro();
        rubro.setCod_rubro_bien(cod_rubro_bien);
        rubro.setDesc_rubro_bien(desc_rubro_bien);
        return repositorioRubro.save(rubro);
    }

    public Rubro actualizarRubro(Integer id, String cod_rubro_bien, String desc_rubro_bien) {
        Rubro rubro = buscarPorId(id);
        rubro.setCod_rubro_bien(cod_rubro_bien);
        rubro.setDesc_rubro_bien(desc_rubro_bien);
        return repositorioRubro.save(rubro);
    }

}