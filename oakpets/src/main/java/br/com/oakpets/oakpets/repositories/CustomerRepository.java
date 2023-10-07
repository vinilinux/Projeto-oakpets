package br.com.oakpets.oakpets.repositories;

import br.com.oakpets.oakpets.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);
}
