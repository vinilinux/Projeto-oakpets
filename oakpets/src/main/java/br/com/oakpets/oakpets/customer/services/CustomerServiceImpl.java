package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.repository.CustomerRepository;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Customer> findAllCustomersWithAddresses() {
        return customerRepository.findAllCustomersWithAddresses();
    }
    @Override
    public Customer update(Integer id, Customer obj) {
        Customer newObj = findById(id);

        newObj.setName(obj.getName());
        newObj.setBDay(obj.getBDay());
        newObj.setCpf(obj.getCpf());
        newObj.setEmail(obj.getEmail());
        newObj.setPassword(obj.getPassword());
        newObj.setGender(obj.getGender());

        return customerRepository.save(newObj);
    }

    public Customer findById(Integer id) {
        return customerRepository.findById(id);
    }
}
