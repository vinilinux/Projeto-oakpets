package br.com.oakpets.oakpets.repositories;

import br.com.oakpets.oakpets.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository <User, Long> {

    boolean existsByEmail(String email);

    UserDetails findByEmail(String email);


}
