package br.com.oakpets.oakpets.customer.repository;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByEnabled(boolean enabled);

    Address findById(Integer id);

    Optional<Address> findById(Long id);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Address a WHERE a.idCustomer.customerId = :clientId AND a.addressKind = 'Faturamento' AND a.enabled = true")
    Boolean existsActiveBillingAddressByClientId(Integer clientId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Address a WHERE a.idCustomer.customerId = :clientId AND a.addressKind = 'Entrega' AND a.enabled = true")
    Boolean existsActiveDeliveryAddressByClientId(Integer clientId);



    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Address a " +
            "WHERE a.idCustomer.customerId = :clientId " +
            "AND a.addressKind = 'Entrega' " +
            "AND a.enabled = true " +
            "AND a.addressDefault = true")
    Boolean existsActiveDefaultAddressByClientId(Integer clientId);

}
