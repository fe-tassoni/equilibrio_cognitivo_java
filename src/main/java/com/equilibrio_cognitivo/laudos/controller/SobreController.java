package com.equilibrio_cognitivo.laudos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller responsável por fornecer informações públicas sobre o site.
 * Endpoint: /api/publico/sobre
 */
@RestController
@RequestMapping("/api/publico")
public class SobreController {
    /**
     * Retorna informações institucionais sobre o site.
     * @return Mensagem de apresentação do sistema.
     */
    @GetMapping("/sobre")
    public String sobre() {
        return "Bem-vindo ao sistema de correção de testes neuropsicológicos!" +
               " Este site permite o cadastro, correção e acompanhamento de testes de forma segura e escalável.";
    }
}
