package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearRubroRequest;
import com.iosepbp.bienes_patrimoniales.DTO.RubroResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Rubro;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioRubro;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/rubros")
public class ControladorRubro {

    private final ServicioRubro servicioRubro;

    public ControladorRubro(ServicioRubro servicioRubro) {
        this.servicioRubro = servicioRubro;
    }

    // Convierte la entidad Rubro al DTO de respuesta
    public RubroResponse toResponse(Rubro rubro) {
        RubroResponse response = new RubroResponse();
        response.setId_rubro_bien(rubro.getId_rubro_bien());
        response.setCod_rubro_bien(rubro.getCod_rubro_bien());
        response.setDesc_rubro_bien(rubro.getDesc_rubro_bien());
        return response;
    }

    @GetMapping
    public List<RubroResponse> listarRubros() {
        List<RubroResponse> responses = new ArrayList<>();
        for (Rubro r : servicioRubro.listarRubros()) {
            responses.add(toResponse(r));
        }
        return responses;
    }

    @GetMapping("/{id}")
    public RubroResponse buscarRubro(@PathVariable Integer id) {
        return toResponse(servicioRubro.buscarPorId(id));
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public RubroResponse crearRubro(@Valid @RequestBody CrearRubroRequest request) {
        return toResponse(servicioRubro.crearRubro(
                request.cod_rubro_bien,
                request.desc_rubro_bien
        ));
    }

    @PutMapping("/{id}")
    public RubroResponse actualizarRubro(@PathVariable Integer id,
                                         @Valid @RequestBody CrearRubroRequest request) {
        return toResponse(servicioRubro.actualizarRubro(
                id,
                request.cod_rubro_bien,
                request.desc_rubro_bien
        ));
    }
}
