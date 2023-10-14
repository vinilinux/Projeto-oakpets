package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.repository.CustomerRepository;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {


    // implementação da interface CustomerService, no qual procura o e-mail no banco de dados e valida a senha.
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer authenticate(String email, String password) {
        Customer customer = customerRepository.findByEmail(email);

        if (customer != null && password.equals(customer.getPassword())) {
            return customer;
        }

        return null;
    }
}
