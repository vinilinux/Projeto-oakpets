package br.com.oakpets.oakpets.usuario.controller;

import br.com.oakpets.oakpets.infra.security.TokenService;
import br.com.oakpets.oakpets.usuario.DTO.AuthenticationDTO;
import br.com.oakpets.oakpets.usuario.DTO.LoginResponseDTO;
import br.com.oakpets.oakpets.usuario.DTO.UserDTO;
import br.com.oakpets.oakpets.usuario.entities.User;
import br.com.oakpets.oakpets.usuario.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GrantedAuthority> authorities = (List<GrantedAuthority>) authentication.getAuthorities();

        boolean hasEstoqueRole = authorities.stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_ESTOQUE"));

        System.out.println(hasEstoqueRole);


        return ResponseEntity.ok(new LoginResponseDTO(token, data.login()));
    }

    @PostMapping("/create")
    public ResponseEntity createUser(@RequestBody  UserDTO data) {

        if (!data.password2().equals(data.password())) {
            return ResponseEntity.badRequest().body("Senhas não conferem");
        }

        if (userService.validateEmail(data.email())) {
            return ResponseEntity.badRequest().body("Usuário já existe");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), data.email(), encryptedPassword, data.cpf(), true, data.role());
        userService.createUser(newUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping
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

    @PutMapping("{id}/alterar")
    public ResponseEntity alterarUser(@PathVariable Long id, @RequestBody UserDTO data) {

        User newuser = User.builder()
                .name(data.name())
                .cpf(data.cpf())
                .email(data.email())
                .role(data.role())
                .build();

        if (data.password() != null) {
            if (data.password2().equals(data.password())) {
                newuser.setPassword(new BCryptPasswordEncoder().encode(data.password()));
            }
        }

        try {
            userService.alterarUser(id, newuser);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}/status")
    public ResponseEntity status(@PathVariable Long id, @RequestBody UserDTO data) {
        try {
            userService.status(id, data);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
