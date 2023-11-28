package br.com.oakpets.oakpets.usuario.service;

import br.com.oakpets.oakpets.usuario.DTO.UserDTO;
import br.com.oakpets.oakpets.usuario.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User createUser(User user);

    boolean validateEmail(String email);

    Optional<User> getById(Long id);

    List<User> findAll();

    void alterarUser(Long id, User user);


    void status(Long id, boolean data);
}
