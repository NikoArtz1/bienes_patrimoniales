package com.iosepbp.bienes_patrimoniales.Controladores;

import com.iosepbp.bienes_patrimoniales.Modelos.Usuario;
import com.iosepbp.bienes_patrimoniales.Repositorios.*;
import com.iosepbp.bienes_patrimoniales.Seguridad.JWTService;
import com.iosepbp.bienes_patrimoniales.Seguridad.UsuarioDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class ControladorJWT {

    private final AuthenticationManager authenticationManager;
    private final UsuarioDetailsService usuarioDetailsService;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final RepositorioUsuario repositorioUsuario;

    public ControladorJWT(
            AuthenticationManager authenticationManager,
            UsuarioDetailsService usuarioDetailsService,
            JWTService jwtService,
            PasswordEncoder passwordEncoder,
            RepositorioUsuario repositorioUsuario
    ){
        this.authenticationManager = authenticationManager;
        this.usuarioDetailsService = usuarioDetailsService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.repositorioUsuario = repositorioUsuario;
    }

    public record LoginRequest(String nombreUsuario, String contraseña){}

    public record LoginResponse(String token){}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.nombreUsuario(),
                            loginRequest.contraseña()
                    )
            );

            UserDetails userDetails = usuarioDetailsService
                    .loadUserByUsername(loginRequest.nombreUsuario());

            String token = jwtService.generarToken(userDetails);

            return ResponseEntity.ok(new LoginResponse(token));
        } catch (AuthenticationException e){
            return ResponseEntity.status(401).body("Credenciales invalidas");
        }
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario usuario) {
        usuario.setContraseña(passwordEncoder.encode(usuario.getContraseña()));
        repositorioUsuario.save(usuario);
        return ResponseEntity.ok("Usuario creado");
    }
}
