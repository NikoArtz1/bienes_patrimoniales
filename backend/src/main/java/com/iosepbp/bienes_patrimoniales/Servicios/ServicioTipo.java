package com.iosepbp.bienes_patrimoniales.Servicios;

import com.iosepbp.bienes_patrimoniales.Modelos.Tipo;
import com.iosepbp.bienes_patrimoniales.Repositorios.RepositorioTipo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioTipo {

    private final RepositorioTipo repositorioTipo;

    public ServicioTipo(RepositorioTipo repositorioTipo) {
        this.repositorioTipo = repositorioTipo;
    }

    public List<Tipo> listarTipos() {
        return repositorioTipo.findAll();
    }

    public Tipo buscarPorId(Integer id) {
        return repositorioTipo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tipo no encontrado con id: " + id));
    }

    public Tipo crearTipo(String cod_tipo_bien, String desc_tipo_bien) {
        Tipo tipo = new Tipo();
        tipo.setCod_tipo_bien(cod_tipo_bien);
        tipo.setDesc_tipo_bien(desc_tipo_bien);
        return repositorioTipo.save(tipo);
    }

    public Tipo actualizarTipo(Integer id, String cod_tipo_bien, String desc_tipo_bien) {
        Tipo tipo = buscarPorId(id);
        tipo.setCod_tipo_bien(cod_tipo_bien);
        tipo.setDesc_tipo_bien(desc_tipo_bien);
        return repositorioTipo.save(tipo);
    }

}