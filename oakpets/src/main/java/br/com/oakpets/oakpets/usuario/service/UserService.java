package br.com.oakpets.oakpets.services;

import br.com.oakpets.oakpets.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User createUser(User user);

    void validateEmail(String email);

    //User authenticate(String email, String senha);

    Optional<User> getById(Long id);

    List<User> findAll();

    void alterarUser(User user);


}
