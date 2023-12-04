package br.com.oakpets.oakpets.usuario.service;

import br.com.oakpets.oakpets.usuario.DTO.UserDTO;
import br.com.oakpets.oakpets.usuario.entities.User;
import br.com.oakpets.oakpets.usuario.repository.UserRepository;
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
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    public UserServiceImpl(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }


    @Override
    public User createUser(User user) {
        return repository.save(user);
    }

    @Override
    public boolean validateEmail(String email) {

       return repository.existsByEmail(email);
    }


    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public void alterarUser(Long id, User user) {

        Optional<User> userOptional = repository.findById(id);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Usuario não encontrado");
        }

        if (!user.getName().equals(userOptional.get().getName())) {
            userOptional.get().setName(user.getName());
        }

        if (!user.getCpf().equals(userOptional.get().getCpf())) {
            userOptional.get().setCpf(user.getCpf());
        }

        System.out.printf(userOptional.get().getEmail());
        if (!user.getEmail().equals(userOptional.get().getEmail())) {
            if (validateEmail(user.getEmail())) {
                throw new RuntimeException("Email já cadastrado");
            } else {
                userOptional.get().setEmail(user.getEmail());
            }
        }
        if (!user.getRole().equals(userOptional.get().getRole())) {
            userOptional.get().setRole(user.getRole());
        }

        if (user.getPassword() != null) {
            userOptional.get().setPassword(user.getPassword());
        }

        repository.save(userOptional.get());
    }

    @Override
    public void status(Long id, boolean data) {
        Optional<User> userOptional = repository.findById(id);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Usuario não encontrado");
        }

        userOptional.get().setStatus(data);
        repository.save(userOptional.get());
    }

    @Override
    public Optional<User> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return repository.findByEmail(username);

    }

}
