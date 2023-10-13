package br.com.oakpets.oakpets.controllers;

import br.com.oakpets.oakpets.DTO.AuthenticationDTO;
import br.com.oakpets.oakpets.entities.User;
import br.com.oakpets.oakpets.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    /*
    @GetMapping("/autenticar")
    public ResponseEntity autenticar(@RequestBody User user) {
        try {
            User autenticado = userService.authenticate(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(autenticado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

     */

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        return ResponseEntity.ok().build();
    }

    /*
    @PostMapping("/salvar")
    public ResponseEntity salvar(@RequestBody @Valid User user) {
        try {
            User userSalvo = userService.createUser(user);
            return new ResponseEntity(userSalvo, HttpStatus.CREATED);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

     */

    @PostMapping("/create")
    public ResponseEntity createUser(@RequestBody @Valid UserDTO data) {

    }

    @GetMapping("/listarTodos")
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
