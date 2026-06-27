package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearUbicacionRequest;
import com.iosepbp.bienes_patrimoniales.DTO.UbicacionResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Ubicacion;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioUbicacion;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/ubicaciones")
public class ControladorUbicacion {

    private final ServicioUbicacion servicioUbicacion;

    public ControladorUbicacion(ServicioUbicacion servicioUbicacion) {
        this.servicioUbicacion = servicioUbicacion;
    }

    // Convierte la entidad Ubicacion al DTO de respuesta
    public UbicacionResponse toResponse(Ubicacion ubicacion) {
        UbicacionResponse response = new UbicacionResponse();
        response.setId_ubicacion_bien(ubicacion.getId_ubicacion_bien());
        response.setCod_ubicacion_bien(ubicacion.getCod_ubicacion_bien());
        response.setDesc_ubicacion_bien(ubicacion.getDesc_ubicacion_bien());
        return response;
    }

    @GetMapping
    public List<UbicacionResponse> listarUbicaciones() {
        List<UbicacionResponse> responses = new ArrayList<>();
        for (Ubicacion u : servicioUbicacion.listarUbicaciones()) {
            responses.add(toResponse(u));
        }
        return responses;
    }

    @GetMapping("/{id}")
    public UbicacionResponse buscarUbicacion(@PathVariable Integer id) {
        return toResponse(servicioUbicacion.buscarPorId(id));
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public UbicacionResponse crearUbicacion(@Valid @RequestBody CrearUbicacionRequest request) {
        return toResponse(servicioUbicacion.crearUbicacion(
                request.cod_ubicacion_bien,
                request.desc_ubicacion_bien
        ));
    }

    @PutMapping("/{id}")
    public UbicacionResponse actualizarUbicacion(@PathVariable Integer id,
                                                  @Valid @RequestBody CrearUbicacionRequest request) {
        return toResponse(servicioUbicacion.actualizarUbicacion(
                id,
                request.cod_ubicacion_bien,
                request.desc_ubicacion_bien
        ));
    }
}
