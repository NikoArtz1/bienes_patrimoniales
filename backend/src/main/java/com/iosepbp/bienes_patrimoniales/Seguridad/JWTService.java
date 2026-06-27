package com.iosepbp.bienes_patrimoniales.Seguridad;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JWTService {

    //Lee el valor de la clave secreta en application.properties
    @Value("${jwt.secret}")
    private String secret;

    //Lee el valor de expiracion en application.properties
    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    //Genera un token con un sujeto (usuario), una fecha de generacion, y una fecha de expiracion
    public String generarToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    public String extraerNombreUsuario(String token){
        return extraerClaims(token).getSubject();
    }

    //Valida si el nombre del token es igual al nombre del usuario Y si esta expirado o no
    public boolean validarToken(String token, UserDetails userDetails) {
        String nombreUsuario = extraerNombreUsuario(token);

        return nombreUsuario.equals(userDetails.getUsername()) && !estaExpirado(token);
    }

    public boolean estaExpirado(String token){
        return extraerClaims(token).getExpiration().before(new Date());
    }

    //Claims es un Map con los datos del payload del token
    public Claims extraerClaims(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey()) //Verifica la firma
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
