package br.com.oakpets.oakpets.usuario.DTO;

import br.com.oakpets.oakpets.usuario.entities.UserRole;

public record UserDTO(String name, String email, String password,String password2, String cpf, UserRole role,
                      boolean status) {
}
