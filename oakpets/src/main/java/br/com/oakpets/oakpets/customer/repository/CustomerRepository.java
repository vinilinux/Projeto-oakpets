package br.com.oakpets.oakpets.customer.repository;

import br.com.oakpets.oakpets.customer.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);

    @Query("SELECT c FROM Customer c LEFT JOIN FETCH c.addresses a")
    List<Customer> findAllCustomersWithAddresses();

    @Query("SELECT c FROM Customer c LEFT JOIN FETCH c.addresses WHERE c.id = :customerId")
    Customer findByIdWithAddresses(@Param("customerId") Integer customerId);
}
