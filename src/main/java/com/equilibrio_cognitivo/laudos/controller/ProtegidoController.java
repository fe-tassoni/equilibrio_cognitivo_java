package com.equilibrio_cognitivo.laudos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/protegido")
public class ProtegidoController {
    @GetMapping("/teste")
    public String testeProtegido() {
        return "Acesso autenticado com sucesso!";
    }
}
