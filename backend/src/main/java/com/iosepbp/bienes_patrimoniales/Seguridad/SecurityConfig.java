package com.iosepbp.bienes_patrimoniales.Seguridad;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.iosepbp.bienes_patrimoniales.Seguridad.Handlers.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final UsuarioDetailsService usuarioDetailsService;

    private final LoginSuccessHandler loginSuccessHandler;

    private final LoginFailureHandler loginFailureHandler;

    private final JWTFilter jwtFilter;

    private final SQLInjectionFilter sqlInjectionFilter;

    public SecurityConfig(
            UsuarioDetailsService usuarioDetailsService,
            LoginSuccessHandler loginSuccessHandler,
            LoginFailureHandler loginFailureHandler,
            JWTFilter jwtFilter,
            SQLInjectionFilter sqlInjectionFilter
    ){
        this.usuarioDetailsService = usuarioDetailsService;
        this.loginSuccessHandler = loginSuccessHandler;
        this.loginFailureHandler = loginFailureHandler;
        this.jwtFilter = jwtFilter;
        this.sqlInjectionFilter = sqlInjectionFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login","/login",
                                "/css/**", "/js/**",
                                "/auth/login", "/auth/registro", "/error").permitAll()
                        .requestMatchers("/bienes/**").authenticated()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(sqlInjectionFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // IMPORTANTE: Pon aquí la URL exacta de tu frontend (sin la barra final /)
        configuration.setAllowedOrigins(List.of("http://127.0.0.1:5500", "http://localhost:5500"));

        // Permitimos los métodos HTTP que usará nuestro frontend
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permitimos todas las cabeceras (Content-Type, Authorization, etc.)
        configuration.setAllowedHeaders(List.of("*"));

        // Permitimos que se envíen credenciales si hiciera falta (cookies, auth headers)
        configuration.setAllowCredentials(Boolean.TRUE);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplicamos esta configuración a todos los endpoints de la API
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
}


