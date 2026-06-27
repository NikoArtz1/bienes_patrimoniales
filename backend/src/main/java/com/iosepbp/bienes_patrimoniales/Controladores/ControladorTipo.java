package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.CrearTipoRequest;
import com.iosepbp.bienes_patrimoniales.DTO.TipoResponse;
import com.iosepbp.bienes_patrimoniales.Modelos.Tipo;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioTipo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipos")
public class ControladorTipo {

    private final ServicioTipo servicioTipo;

    public ControladorTipo(ServicioTipo servicioTipo) {
        this.servicioTipo = servicioTipo;
    }

    @GetMapping
    public List<Tipo> listarTipos() {
        return servicioTipo.listarTipos();
    }

    @GetMapping("/{id}")
    public Tipo buscarTipo(@PathVariable Integer id) {
        return servicioTipo.buscarPorId(id);
    }

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public Tipo crearTipo(@Valid @RequestBody CrearTipoRequest request) {
        return servicioTipo.crearTipo(request.cod_tipo_bien, request.desc_tipo_bien);
    }

    @PutMapping("/{id}")
    public Tipo actualizarTipo(@PathVariable Integer id,
                               @Valid @RequestBody CrearTipoRequest request) {
        return servicioTipo.actualizarTipo(id, request.cod_tipo_bien, request.desc_tipo_bien);
    }

}