package com.iosepbp.bienes_patrimoniales.Seguridad;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.iosepbp.bienes_patrimoniales.Seguridad.Handlers.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login","/login",
                                "/css/**", "/js/**",
                                "/auth/login", "/auth/registro").permitAll()
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
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
}


