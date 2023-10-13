package br.com.oakpets.oakpets.services.impl;

import br.com.oakpets.oakpets.entities.User;
import br.com.oakpets.oakpets.repositories.UserRepository;
import br.com.oakpets.oakpets.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private  UserRepository repository;
    private final PasswordEncoder encoder;

    public UserServiceImpl (UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }
    @Override
    @Transactional
    public User createUser(User user) {
        validateEmail(user.getEmail());
        user.setPassword(encoder.encode(user.getPassword()));
        user.setStatus("ativo");
        return repository.save(user);
    }

    @Override
    public void validateEmail(String email) {
         boolean existe = repository.existsByEmail(email);

         if (existe) {
             throw new RuntimeException("Já existe usuário cadastrado com este email");
         }
    }

    /*
    @Override
    public User authenticate(String email, String senha) {
        Optional<User> byEmail = repository.findByEmail(email);

        if (!byEmail.isPresent()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        if (!encoder.matches(senha, byEmail.get().getPassword())) {
            throw new RuntimeException("Senha inválida.");
        }
        if (byEmail.get().getStatus().equals("inativo")) {
            throw new RuntimeException("Usuário inativo");
        }

        return byEmail.get();
    }

     */


    @Override
    public List<User> findAll() {
        List<User> allUser = repository.findAll();
        return allUser;
    }

    @Override
    public void alterarUser(User user) {
        Optional<User> userOptional = repository.findById(user.getIdUser());

        if (!userOptional.get().getPassword().equals(user.getPassword())) {
            user.setPassword(encoder.encode(user.getPassword()));
        }

        repository.save(user);
    }

    @Override
    @Transactional
    public Optional<User> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username);
    }
}
