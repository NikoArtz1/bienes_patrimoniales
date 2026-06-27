package com.iosepbp.bienes_patrimoniales.Seguridad;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.*;
import org.springframework.web.filter.*;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UsuarioDetailsService usuarioDetailsService;

    public JWTFilter(JWTService jwtService, UsuarioDetailsService usuarioDetailsService){
        this.jwtService = jwtService;
        this.usuarioDetailsService = usuarioDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        //Lee la autenticacion en el header del request
        String authHeader = request.getHeader("Authorization");

        //Si ve que no hay header o no empieza con Bearer, lo pasa al siguiente filtro
        //Spring se encarga si validarlo o no
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        //Extrae el token sacando el prefijo "Bearer "
        String token = authHeader.substring(7);

        String nombreUsuario = jwtService.extraerNombreUsuario(token);

        if (nombreUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = usuarioDetailsService.loadUserByUsername(nombreUsuario);

            if (jwtService.validarToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null, //Credenciales nulas. Ya validamos el token en el if.
                                userDetails.getAuthorities()
                        );

                //Agrega detalles del request, como IP y sesion, al objeto de autentication
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                //Registra la autenticacion en el contexto
                //En futuras request, Spring ya sabe que este request esta autorizado
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
