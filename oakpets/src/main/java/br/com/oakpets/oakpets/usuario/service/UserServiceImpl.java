package br.com.oakpets.oakpets.usuario.service;

import br.com.oakpets.oakpets.usuario.entities.User;
import br.com.oakpets.oakpets.usuario.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    public UserServiceImpl(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }


    @Override
    @Transactional
    public User createUser(User user) {
        return repository.save(user);
    }

    @Override
    public boolean validateEmail(String login) {

       return repository.existsByLogin(login);
    }


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
    public Optional<User> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDetails userDetails = repository.findByLogin(username);

        return userDetails;

    }

}
