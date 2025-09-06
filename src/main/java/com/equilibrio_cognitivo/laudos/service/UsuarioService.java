package com.equilibrio_cognitivo.laudos.service;

import com.equilibrio_cognitivo.laudos.model.Usuario;
import com.equilibrio_cognitivo.laudos.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

/**
 * Serviço responsável pela lógica de autenticação e cadastro de usuários.
 */
@Service
public class UsuarioService {
    /**
     * Verifica se o e-mail já está cadastrado.
     */
    public boolean emailExiste(String email) {
        return usuarioRepository.buscarPorEmail(email).isPresent();
    }
    private final UsuarioRepository usuarioRepository = new UsuarioRepository();

    /**
     * Realiza o cadastro de um novo usuário.
     * @param usuario Usuário a ser cadastrado
     * @return true se cadastro for bem-sucedido, false se e-mail já existir
     */
    public boolean cadastrar(Usuario usuario) {
        if (usuarioRepository.buscarPorEmail(usuario.getEmail()).isPresent()) {
            return false; // E-mail já cadastrado
        }
        usuarioRepository.salvar(usuario);
        return true;
    }

    /**
     * Realiza autenticação simples (apenas para exemplo, sem segurança real).
     */
    public boolean autenticar(String email, String senha) {
        return usuarioRepository.buscarPorEmail(email)
                .map(u -> u.getSenha().equals(senha))
                .orElse(false);
    }
}
