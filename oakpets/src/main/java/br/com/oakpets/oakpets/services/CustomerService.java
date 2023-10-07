package br.com.oakpets.oakpets.services;

import br.com.oakpets.oakpets.entities.Customer;
import br.com.oakpets.oakpets.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

public interface CustomerService {

    //usado para o login
    Customer authenticate(String email, String password);
}