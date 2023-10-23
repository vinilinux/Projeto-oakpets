package br.com.oakpets.oakpets.usuario.controller;

import br.com.oakpets.oakpets.infra.security.TokenService;
import br.com.oakpets.oakpets.usuario.DTO.AuthenticationDTO;
import br.com.oakpets.oakpets.usuario.DTO.LoginResponseDTO;
import br.com.oakpets.oakpets.usuario.DTO.UserDTO;
import br.com.oakpets.oakpets.usuario.entities.User;
import br.com.oakpets.oakpets.usuario.entities.UserRole;
import br.com.oakpets.oakpets.usuario.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UserController {

    private UserService userService;

    private AuthenticationManager authenticationManager;

    private TokenService tokenService;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        if (!userService.validateEmail(data.login())) {
            return ResponseEntity.badRequest().body("Usuário não existe");
        }

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());

        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());


        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/create")
    @CrossOrigin(origins = "*")
    public ResponseEntity createUser(@RequestBody  UserDTO data) {

        if (data.email() == null) {
            return ResponseEntity.badRequest().body("Dados inválidos");
        }

        if (userService.validateEmail(data.email())) {
            return ResponseEntity.badRequest().body("Usuário já existe");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), data.email(), encryptedPassword, data.cpf(), "ativo", data.role());
        userService.createUser(newUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity listarTodos() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}/details")
    public ResponseEntity buscar(@PathVariable Long id) {

        Optional<User> user = userService.getById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/alterar")
    public ResponseEntity alterarUser(@RequestBody @Valid User user) {
        try {
            userService.alterarUser(user);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Falha ao alterar " + e);
        }

    }
}
