package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;

import java.util.List;


public interface CustomerService {

    Customer authenticate(String email, String password);

    List<Customer> findAllCustomersWithAddresses();


    Customer findByCustomerId(Integer id);

    Customer findByIdWithAddresses(Integer id);

    Customer update(Integer id, Customer obj);

    Customer create(Customer obj);

    Boolean doesEmailExist(String email);

    Boolean existsByCpf(String cpf);

    Customer findCustomerByEmail(String email);

    Customer findCustomerWithActiveAddressesById(Integer id);

    Address updateAddress(Integer customerId, Integer addressId, Address updatedAddress);
}
