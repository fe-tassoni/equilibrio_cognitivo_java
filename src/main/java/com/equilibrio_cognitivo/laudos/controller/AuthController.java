package com.equilibrio_cognitivo.laudos.controller;

import com.equilibrio_cognitivo.laudos.model.Usuario;
import com.equilibrio_cognitivo.laudos.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller responsável pelos endpoints de autenticação: cadastro, login e esqueci a senha.
 * Endpoints: /api/auth/cadastro, /api/auth/login, /api/auth/esqueci-senha
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UsuarioService usuarioService = new UsuarioService();

    /**
     * Endpoint para cadastro de novo usuário.
     */
    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@RequestBody Usuario usuario) {
        if (usuarioService.cadastrar(usuario)) {
            return ResponseEntity.ok("Usuário cadastrado com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("E-mail já cadastrado.");
        }
    }

    /**
     * Endpoint para login de usuário.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        if (usuarioService.autenticar(usuario.getEmail(), usuario.getSenha())) {
            return ResponseEntity.ok("Login realizado com sucesso!");
        } else {
            return ResponseEntity.status(401).body("E-mail ou senha inválidos.");
        }
    }

    /**
     * Endpoint para recuperação de senha (simulado).
     */
    @PostMapping("/esqueci-senha")
    public ResponseEntity<String> esqueciSenha(@RequestBody Usuario usuario) {
        // Simulação: apenas verifica se o e-mail existe
        if (usuarioService.cadastrar(usuario)) {
            return ResponseEntity.badRequest().body("E-mail não cadastrado.");
        } else {
            return ResponseEntity.ok("Instruções de recuperação enviadas para o e-mail.");
        }
    }
}
