package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearDepartamentoRequest;
import com.iosepbp.bienes_patrimoniales.DTO.DepartamentoResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Departamento;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioDepartamento;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departamentos")
public class ControladorDepartamento {

    private final ServicioDepartamento servicioDepartamento;

    public ControladorDepartamento(ServicioDepartamento servicioDepartamento) {
        this.servicioDepartamento = servicioDepartamento;
    }

    @GetMapping
    public List<Departamento> listarDepartamentos() {
        return servicioDepartamento.listarDepartamentos();
    }

    @GetMapping("/{id}")
    public Departamento buscarDepartamento(@PathVariable Integer id) {
        return servicioDepartamento.buscarPorId(id);
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public Departamento crearDepartamento(@Valid @RequestBody CrearDepartamentoRequest request) {
        return servicioDepartamento.crearDepartamento(request.cod_departamento, request.desc_departamento);
    }

    @PutMapping("/{id}")
    public Departamento actualizarDepartamento(@PathVariable Integer id,
                                               @Valid @RequestBody CrearDepartamentoRequest request) {
        return servicioDepartamento.actualizarDepartamento(id, request.cod_departamento, request.desc_departamento);
    }

}