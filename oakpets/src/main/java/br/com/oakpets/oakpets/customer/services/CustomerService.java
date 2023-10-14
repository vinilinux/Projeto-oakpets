package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Customer;


public interface CustomerService {

    //usado para o login
    Customer authenticate(String email, String password);
}