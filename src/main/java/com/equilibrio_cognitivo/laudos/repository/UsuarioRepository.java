package com.equilibrio_cognitivo.laudos.repository;

import com.equilibrio_cognitivo.laudos.model.Usuario;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Repositório simples em memória para usuários.
 * Em produção, substitua por um banco de dados real.
 */
public class UsuarioRepository {
    // Simula um banco de dados em memória
    private final ConcurrentHashMap<String, Usuario> usuarios = new ConcurrentHashMap<>();

    public void salvar(Usuario usuario) {
        usuarios.put(usuario.getEmail(), usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return Optional.ofNullable(usuarios.get(email));
    }
}
