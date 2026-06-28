package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.DTO.BienResponse;
import com.iosepbp.bienes_patrimoniales.DTO.CrearBienRequest;
import com.iosepbp.bienes_patrimoniales.Modelos.Bien;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioBien;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bienes")
public class ControladorBien {
    private final ServicioBien servicioBien;

    public ControladorBien(ServicioBien servicioBien){
        this.servicioBien = servicioBien;
    }

    public BienResponse toResponse(Bien bien){
        //Creamos un response vacio
        BienResponse response = new BienResponse();

        //Lo llenamos con los campos de "bien"
        //Deberiamos intentar reducir la cantidad de metodos encadenados aqui
        response.setId_bien(bien.getId_bien());
        response.setCod_bien(bien.getCod_bien());
        response.setDesc_bien(bien.getDesc_bien());
        response.setDesc_detallada(bien.getDesc_detallada());
        response.setId_rubro_bien(bien.getRubro().getId_rubro_bien());
        response.setId_tipo_bien(bien.getTipo().getId_tipo_bien());
        response.setId_departamento(bien.getDepartamento().getId_departamento());
        response.setId_responsable(bien.getResponsable().getId_responsable());
        response.setId_ubicacion(bien.getUbicacion().getId_ubicacion_bien());
        response.setFecha_alta(bien.getFecha_alta());
        response.setMoneda(bien.getMoneda());
        response.setValor_moneda(bien.getValor_moneda());

        return response;
    }

    @GetMapping
    public List<BienResponse> listarBienes(){
        List<BienResponse> bienResponses = new ArrayList<>();
        List<Bien> bienes = servicioBien.listarBienes();

        for(Bien bien : bienes){
            BienResponse response = toResponse(bien);
            bienResponses.add(response);
        }

        return bienResponses;
    }

    @PostMapping("/crear")
    public BienResponse crearBien(@Valid @RequestBody CrearBienRequest request){
        Bien bien = servicioBien.crearBien(
                request.cod_bien,
                request.desc_bien,
                request.desc_detallada,
                request.id_rubro_bien,
                request.id_tipo_bien,
                request.id_departamento,
                request.id_responsable,
                request.id_ubicacion,
                request.fecha_alta,
                request.moneda,
                request.valor_moneda
        );

        return toResponse(bien);
    }
}
