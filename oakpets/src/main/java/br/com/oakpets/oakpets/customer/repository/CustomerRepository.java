package br.com.oakpets.oakpets.customer.repository;

import br.com.oakpets.oakpets.customer.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);

    Customer findById(Integer id);
    @Query("SELECT c FROM Customer c LEFT JOIN FETCH c.addresses a")
    List<Customer> findAllCustomersWithAddresses();
}
