package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearResponsableRequest;
import com.iosepbp.bienes_patrimoniales.DTO.ResponsableResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Responsable;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioResponsable;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/responsables")
public class ControladorResponsable {

    private final ServicioResponsable servicioResponsable;

    public ControladorResponsable(ServicioResponsable servicioResponsable) {
        this.servicioResponsable = servicioResponsable;
    }

    // Convierte la entidad Responsable al DTO de respuesta
    public ResponsableResponse toResponse(Responsable responsable) {
        ResponsableResponse response = new ResponsableResponse();
        response.setId_responsable(responsable.getId_responsable());
        response.setCod_responsable(responsable.getCod_responsable());
        response.setDesc_responsable(responsable.getDesc_responsable());
        return response;
    }

    @GetMapping
    public List<ResponsableResponse> listarResponsables() {
        List<ResponsableResponse> responses = new ArrayList<>();
        for (Responsable r : servicioResponsable.listarResponsables()) {
            responses.add(toResponse(r));
        }
        return responses;
    }

    @GetMapping("/{id}")
    public ResponsableResponse buscarResponsable(@PathVariable Integer id) {
        return toResponse(servicioResponsable.buscarPorId(id));
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponsableResponse crearResponsable(@Valid @RequestBody CrearResponsableRequest request) {
        return toResponse(servicioResponsable.crearResponsable(
                request.cod_responsable,
                request.desc_responsable
        ));
    }

    @PutMapping("/{id}")
    public ResponsableResponse actualizarResponsable(@PathVariable Integer id,
                                                     @Valid @RequestBody CrearResponsableRequest request) {
        return toResponse(servicioResponsable.actualizarResponsable(
                id,
                request.cod_responsable,
                request.desc_responsable
        ));
    }
}
