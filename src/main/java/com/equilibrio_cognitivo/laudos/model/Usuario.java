package com.equilibrio_cognitivo.laudos.model;

/**
 * Classe que representa o usuário do sistema.
 * Pode ser expandida futuramente para incluir mais campos.
 */
public class Usuario {
    private String nome;
    private String email;
    private String senha;

    // Construtores
    public Usuario() {}
    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}
