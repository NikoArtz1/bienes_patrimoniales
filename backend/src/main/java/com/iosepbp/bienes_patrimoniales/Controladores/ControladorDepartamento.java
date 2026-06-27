package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearDepartamentoRequest;
import com.iosepbp.bienes_patrimoniales.DTO.DepartamentoResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Departamento;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioDepartamento;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/departamentos")
public class ControladorDepartamento {

    private final ServicioDepartamento servicioDepartamento;

    public ControladorDepartamento(ServicioDepartamento servicioDepartamento) {
        this.servicioDepartamento = servicioDepartamento;
    }

    // Convierte la entidad Departamento al DTO de respuesta
    public DepartamentoResponse toResponse(Departamento departamento) {
        DepartamentoResponse response = new DepartamentoResponse();
        response.setId_departamento(departamento.getId_departamento());
        response.setCod_departamento(departamento.getCod_departamento());
        response.setDesc_departamento(departamento.getDesc_departamento());
        return response;
    }

    @GetMapping
    public List<DepartamentoResponse> listarDepartamentos() {
        List<DepartamentoResponse> responses = new ArrayList<>();
        for (Departamento d : servicioDepartamento.listarDepartamentos()) {
            responses.add(toResponse(d));
        }
        return responses;
    }

    @GetMapping("/{id}")
    public DepartamentoResponse buscarDepartamento(@PathVariable Integer id) {
        return toResponse(servicioDepartamento.buscarPorId(id));
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public DepartamentoResponse crearDepartamento(@Valid @RequestBody CrearDepartamentoRequest request) {
        return toResponse(servicioDepartamento.crearDepartamento(
                request.cod_departamento,
                request.desc_departamento
        ));
    }

    @PutMapping("/{id}")
    public DepartamentoResponse actualizarDepartamento(@PathVariable Integer id,
                                                       @Valid @RequestBody CrearDepartamentoRequest request) {
        return toResponse(servicioDepartamento.actualizarDepartamento(
                id,
                request.cod_departamento,
                request.desc_departamento
        ));
    }
}
