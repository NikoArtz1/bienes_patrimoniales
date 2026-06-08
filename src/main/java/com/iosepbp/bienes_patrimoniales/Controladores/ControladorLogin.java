package com.iosepbp.bienes_patrimoniales.Controladores;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
public class ControladorLogin {

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
