package br.com.oakpets.oakpets.usuario.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "User_backoffice")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USER")
    private Long idUser;

    @Column(name = "NAME")
    @NotBlank(message = "{name.not.blank}")
    private String name;

    @Column(name = "EMAIL")
    @Email(message = "{email.not.valid}")
    @NotBlank(message = "{email.not.blank}")
    private String email;

    @Column(name = "PASSWORD")
    @NotBlank(message = "{senha.not.blank}")
    private String password;

    @Column(name = "CPF")
    @CPF(message = "{cpf.not.valid}")
    @NotBlank(message = "{cpf.not.blank}")
    private String cpf;

    @Column(name = "STATUS")
    private boolean status;

    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public User(String name, String login, String password, String cpf, boolean status, UserRole role) {
        this.name = name;
        this.email = login;
        this.password = password;
        this.cpf = cpf;
        this.status = status;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
                new SimpleGrantedAuthority("ROLE_ESTOQUE"));
        else return List.of(new SimpleGrantedAuthority("ROLE_ESTOQUE"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status;
    }
}
