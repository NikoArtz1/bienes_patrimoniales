package com.iosepbp.bienes_patrimoniales.Seguridad.Handlers;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.*;
import java.time.LocalDateTime;

@Component
public class LoginFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception
    ) throws IOException, ServletException {
        String nombreUsuario = request.getParameter("username");
        String ip = request.getRemoteAddr();
        String timestamp = LocalDateTime.now().toString();

        escribirLog("logs/login.log",
                "[LOGIN FALLIDO]" + timestamp + " | Usuario: " + nombreUsuario + " | IP: " + ip);
    }

    private void escribirLog(String ruta, String mensaje){
        try (PrintWriter pw = new PrintWriter(new FileWriter(ruta, true))){
            pw.println(mensaje);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
