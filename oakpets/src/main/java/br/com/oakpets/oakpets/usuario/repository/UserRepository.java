package br.com.oakpets.oakpets.usuario.repository;

import br.com.oakpets.oakpets.usuario.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository <User, Long> {

    boolean existsByEmail(String email);

    UserDetails findByEmail(String email);


}
