package com.iosepbp.bienes_patrimoniales.Seguridad;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.regex.Pattern;

@Component
public class SQLInjectionFilter extends OncePerRequestFilter {

    private static final Pattern PATRON_SQL = Pattern.compile(
            "('|(\\%27))|(--)|(\\%23)|(/\\*)|" +
                    "(\\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\\b.*)" +
                    "|(;)|xp_",
            Pattern.CASE_INSENSITIVE
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.equals("/auth/login") || path.equals("/auth/registro");
    }

    //Se llama por cada request, analiza cada palabra de cada parametro en busca de inyecciones SQL
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        Map<String, String[]> parametros = request.getParameterMap();

        for (Map.Entry<String, String[]> entrada : parametros.entrySet()) {
            for (String valor : entrada.getValue()) {
                if (PATRON_SQL.matcher(valor).find()) {
                    registrarIntento(request, entrada.getKey(), valor);
                    //Manda un error si se detecta algo sospechoso (coincidencia en regex)
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Solicitud invalida");

                    return;
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private void registrarIntento(HttpServletRequest request,
                                  String parametro, String valor) {
        String ip = request.getRemoteAddr();
        String ruta = request.getRequestURI();
        String timestamp = LocalDateTime.now().toString();
        String mensaje = "[SQL INJECTION] " + timestamp +
                " | IP: " + ip +
                " | Ruta: " + ruta +
                " | Parametro: " + parametro +
                " | Valor: " + valor;

        try (PrintWriter pw = new PrintWriter(new FileWriter("logs/inyeccion.log", true))) {
            pw.println(mensaje);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}