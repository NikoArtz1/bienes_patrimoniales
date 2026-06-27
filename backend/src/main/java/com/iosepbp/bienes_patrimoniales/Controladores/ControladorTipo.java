package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearTipoRequest;
import com.iosepbp.bienes_patrimoniales.DTO.TipoResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Tipo;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioTipo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tipos")
public class ControladorTipo {

    private final ServicioTipo servicioTipo;

    public ControladorTipo(ServicioTipo servicioTipo) {
        this.servicioTipo = servicioTipo;
    }

    // Convierte la entidad Tipo al DTO de respuesta
    public TipoResponse toResponse(Tipo tipo) {
        TipoResponse response = new TipoResponse();
        response.setId_tipo_bien(tipo.getId_tipo_bien());
        response.setCod_tipo_bien(tipo.getCod_tipo_bien());
        response.setDesc_tipo_bien(tipo.getDesc_tipo_bien());
        return response;
    }

    @GetMapping
    public List<TipoResponse> listarTipos() {
        List<TipoResponse> responses = new ArrayList<>();
        for (Tipo t : servicioTipo.listarTipos()) {
            responses.add(toResponse(t));
        }
        return responses;
    }

    @GetMapping("/{id}")
    public TipoResponse buscarTipo(@PathVariable Integer id) {
        return toResponse(servicioTipo.buscarPorId(id));
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public TipoResponse crearTipo(@Valid @RequestBody CrearTipoRequest request) {
        return toResponse(servicioTipo.crearTipo(
                request.cod_tipo_bien,
                request.desc_tipo_bien
        ));
    }

    @PutMapping("/{id}")
    public TipoResponse actualizarTipo(@PathVariable Integer id,
                                       @Valid @RequestBody CrearTipoRequest request) {
        return toResponse(servicioTipo.actualizarTipo(
                id,
                request.cod_tipo_bien,
                request.desc_tipo_bien
        ));
    }
}
