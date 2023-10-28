package br.com.oakpets.oakpets.usuario.DTO;

import br.com.oakpets.oakpets.usuario.entities.UserRole;

public record UserDTO(String login, String password, UserRole role, String cpf, String name, String status) {
}
