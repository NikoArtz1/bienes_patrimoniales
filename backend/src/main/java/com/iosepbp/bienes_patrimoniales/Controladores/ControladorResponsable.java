package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearResponsableRequest;
import com.iosepbp.bienes_patrimoniales.DTO.ResponsableResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Responsable;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioResponsable;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/responsables")
public class ControladorResponsable {

    private final ServicioResponsable servicioResponsable;

    public ControladorResponsable(ServicioResponsable servicioResponsable) {
        this.servicioResponsable = servicioResponsable;
    }

    @GetMapping
    public List<Responsable> listarResponsables() {
        return servicioResponsable.listarResponsables();
    }

    @GetMapping("/{id}")
    public Responsable buscarResponsable(@PathVariable Integer id) {
        return servicioResponsable.buscarPorId(id);
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public Responsable crearResponsable(@Valid @RequestBody CrearResponsableRequest request) {
        return servicioResponsable.crearResponsable(request.cod_responsable, request.desc_responsable);
    }

    @PutMapping("/{id}")
    public Responsable actualizarResponsable(@PathVariable Integer id,
                                             @Valid @RequestBody CrearResponsableRequest request) {
        return servicioResponsable.actualizarResponsable(id, request.cod_responsable, request.desc_responsable);
    }

}