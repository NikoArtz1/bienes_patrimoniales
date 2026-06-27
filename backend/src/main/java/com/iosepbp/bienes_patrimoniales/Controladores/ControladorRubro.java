package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearRubroRequest;
import com.iosepbp.bienes_patrimoniales.DTO.RubroResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Rubro;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioRubro;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rubros")
public class ControladorRubro {

    private final ServicioRubro servicioRubro;

    public ControladorRubro(ServicioRubro servicioRubro) {
        this.servicioRubro = servicioRubro;
    }

    @GetMapping
    public List<Rubro> listarRubros() {
        return servicioRubro.listarRubros();
    }

    @GetMapping("/{id}")
    public Rubro buscarRubro(@PathVariable Integer id) {
        return servicioRubro.buscarPorId(id);
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public Rubro crearRubro(@Valid @RequestBody CrearRubroRequest request) {
        return servicioRubro.crearRubro(request.cod_rubro_bien, request.desc_rubro_bien);
    }

    @PutMapping("/{id}")
    public Rubro actualizarRubro(@PathVariable Integer id,
                                 @Valid @RequestBody CrearRubroRequest request) {
        return servicioRubro.actualizarRubro(id, request.cod_rubro_bien, request.desc_rubro_bien);
    }

}