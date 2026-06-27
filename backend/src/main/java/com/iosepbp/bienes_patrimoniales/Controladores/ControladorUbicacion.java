package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearUbicacionRequest;
import com.iosepbp.bienes_patrimoniales.DTO.UbicacionResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Ubicacion;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioUbicacion;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ubicaciones")
public class ControladorUbicacion {

    private final ServicioUbicacion servicioUbicacion;

    public ControladorUbicacion(ServicioUbicacion servicioUbicacion) {
        this.servicioUbicacion = servicioUbicacion;
    }

    @GetMapping
    public List<Ubicacion> listarUbicaciones() {
        return servicioUbicacion.listarUbicaciones();
    }

    @GetMapping("/{id}")
    public Ubicacion buscarUbicacion(@PathVariable Integer id) {
        return servicioUbicacion.buscarPorId(id);
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public Ubicacion crearUbicacion(@Valid @RequestBody CrearUbicacionRequest request) {
        return servicioUbicacion.crearUbicacion(request.cod_ubicacion_bien, request.desc_ubicacion_bien);
    }

    @PutMapping("/{id}")
    public Ubicacion actualizarUbicacion(@PathVariable Integer id,
                                         @Valid @RequestBody CrearUbicacionRequest request) {
        return servicioUbicacion.actualizarUbicacion(id, request.cod_ubicacion_bien, request.desc_ubicacion_bien);
    }

}