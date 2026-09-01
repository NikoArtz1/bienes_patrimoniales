package com.iosepbp.bienes_patrimoniales.Controladores;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.iosepbp.bienes_patrimoniales.DTO.BienResponse;
import com.iosepbp.bienes_patrimoniales.DTO.CrearBienRequest;
import com.iosepbp.bienes_patrimoniales.Modelos.Bien;
import com.iosepbp.bienes_patrimoniales.Servicios.ServicioBien;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bienes")
public class ControladorBien {
    private final ServicioBien servicioBien;

    public ControladorBien(ServicioBien servicioBien){
        this.servicioBien = servicioBien;
    }

    public BienResponse toResponse(Bien bien) {
        BienResponse response = new BienResponse();

        response.setId_bien(bien.getId_bien());
        response.setCod_bien(bien.getCod_bien());
        response.setDesc_bien(bien.getDesc_bien());
        response.setDesc_detallada(bien.getDesc_detallada());
        response.setId_rubro_bien(bien.getRubro().getId_rubro_bien());
        response.setId_tipo_bien(bien.getTipo().getId_tipo_bien());
        response.setId_departamento(
                bien.getDepartamento() != null ? bien.getDepartamento().getId_departamento() : null);
        response.setId_responsable(
                bien.getResponsable() != null ? bien.getResponsable().getId_responsable() : null
        );
        response.setId_ubicacion(
                bien.getUbicacion() != null ? bien.getUbicacion().getId_ubicacion_bien() : null);
        response.setFecha_alta(bien.getFecha_alta());
        response.setMoneda(
                bien.getMoneda() != null ? bien.getMoneda() : null);
        response.setValor_moneda(
                bien.getValor_moneda() != null ? bien.getValor_moneda() : null);

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

    @GetMapping(value = "/{id}/qr", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generarQR(
            @PathVariable int id,
            @RequestParam String data
    ) throws WriterException, IOException{
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix matrix = writer.encode(data, BarcodeFormat.QR_CODE, 300, 300);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(matrix, "PNG", baos);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(baos.toByteArray());
    }
}
