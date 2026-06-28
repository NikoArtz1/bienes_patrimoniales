package com.iosepbp.bienes_patrimoniales.Servicios;
import com.iosepbp.bienes_patrimoniales.Modelos.*;
import com.iosepbp.bienes_patrimoniales.Repositorios.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioDepartamento {
    private final RepositorioDepartamento repositorioDepartamento;

    public ServicioDepartamento(RepositorioDepartamento repositorioDepartamento) {
        this.repositorioDepartamento = repositorioDepartamento;
    }

    public List<Departamento> listarDepartamentos() {
        return repositorioDepartamento.findAll();
    }

    public Departamento buscarPorId(Integer id) {
        return repositorioDepartamento.findById(id)
                .orElseThrow(() -> new RuntimeException("Departamento no encontrado con id: " + id));
    }

    public Departamento crearDepartamento(String cod_departamento, String desc_departamento) {
        Departamento departamento = new Departamento();
        departamento.setCod_departamento(cod_departamento);
        departamento.setDesc_departamento(desc_departamento);
        return repositorioDepartamento.save(departamento);
    }

    public Departamento actualizarDepartamento(Integer id, String cod_departamento, String desc_departamento) {
        Departamento departamento = buscarPorId(id);
        departamento.setCod_departamento(cod_departamento);
        departamento.setDesc_departamento(desc_departamento);
        return repositorioDepartamento.save(departamento);
    }




}
