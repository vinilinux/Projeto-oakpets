package br.com.oakpets.oakpets.customer.repository;

import br.com.oakpets.oakpets.customer.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);


    @Query("SELECT c FROM Customer c LEFT JOIN FETCH c.addresses a WHERE a.enabled = true")
    List<Customer> findAllCustomersWithAddresses();


    @Query("SELECT c FROM Customer c LEFT JOIN FETCH c.addresses WHERE c.id_customer = :customerId")
    Customer findByIdWithAddresses(@Param("customerId") Integer customerId);

    Boolean existsByEmail(String email);

    Boolean existsByCpf(String cpf);

    @Query("SELECT c FROM Customer c LEFT JOIN FETCH c.addresses a WHERE c.id_customer = :customerId AND a.enabled = true")
    Customer findCustomerWithActiveAddressesById(Integer customerId);



}
