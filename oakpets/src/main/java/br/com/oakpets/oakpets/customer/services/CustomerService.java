package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Customer;

import java.util.List;


public interface CustomerService {

    //usado para o login
    Customer authenticate(String email, String password);

    List<Customer> findAllCustomersWithAddresses();

    Customer update(Integer id, Customer obj);

    Customer findById(Integer id);

    Customer findByIdWithAddresses(Integer id);

    Customer updateCustomerAndAddresses(Integer id, Customer obj);

    Customer create(Customer obj);

    Boolean doesEmailExist(String email);

    Boolean existsByCpf(String cpf);

    Customer findCustomerByEmail(String email);
}