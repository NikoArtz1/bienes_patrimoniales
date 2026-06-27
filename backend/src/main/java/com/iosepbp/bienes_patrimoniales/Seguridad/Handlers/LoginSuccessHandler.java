package com.iosepbp.bienes_patrimoniales.Seguridad.Handlers;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.*;
import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        String nombreUsuario = authentication.getName();
        String ip = request.getRemoteAddr();
        String timestamp = LocalDateTime.now().toString();

        escribirLog("logs/login.log",
                "[LOGIN EXITOSO]" + timestamp + " | Usuario: " + nombreUsuario + " | IP: " + ip);
    }

    private void escribirLog(String ruta, String mensaje){
        try (PrintWriter pw = new PrintWriter(new FileWriter(ruta, true))){
            pw.println(mensaje);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
