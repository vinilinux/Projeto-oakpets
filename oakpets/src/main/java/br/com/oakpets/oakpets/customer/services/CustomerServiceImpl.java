package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.repository.AddressRepository;
import br.com.oakpets.oakpets.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

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
    public Customer update(Integer customerId, Customer customer) {
        Customer updatedCustomer = findByCustomerId(customerId);

        String encryptedPassword = passwordEncoder.encode(customer.getPassword());
        customer.setPassword(encryptedPassword);

        if (updatedCustomer != null) {
            // Copie os atributos do objeto 'customer' para o 'updatedCustomer'
            updatedCustomer.setName(customer.getName());
            updatedCustomer.setBDay(customer.getBDay());
            updatedCustomer.setCpf(customer.getCpf());
            updatedCustomer.setEmail(customer.getEmail());
            updatedCustomer.setPassword(customer.getPassword());
            updatedCustomer.setGender(customer.getGender());

            // Salve o 'updatedCustomer' para atualização no banco de dados
            return customerRepository.save(updatedCustomer);
        } else {
            // Cliente não encontrado
            return null;
        }
    }


    @Override
    public Customer create(Customer obj) {

        if (!isValidName(obj.getName())) {
            throw new RuntimeException("O nome do cliente deve ter 2 palavras e no mínimo 3 letras em cada palavra.");
        }
        if (doesEmailExist(obj.getEmail())) {
            throw new RuntimeException("E-mail já cadastrado!");
        }
        if (existsByCpf(obj.getCpf())) {
            throw new RuntimeException("CPF inválido!");
        }

        String encryptedPassword = passwordEncoder.encode(obj.getPassword());
        obj.setPassword(encryptedPassword);

        return customerRepository.save(obj);
    }


    public Customer findByCustomerId(Integer id) {
        return customerRepository.findByCustomerId(id);
    }

    @Override
    public Customer findByIdWithAddresses(Integer id) {
        return customerRepository.findByIdWithAddresses(id);
    }


    @Override
    public Customer findCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    @Override
    public Customer findCustomerWithActiveAddressesById(Integer id) {
        return customerRepository.findCustomerWithActiveAddressesById(id);
    }


    @Override
    public Boolean doesEmailExist(String email) {

        return customerRepository.existsByEmail(email);
    }

    @Override
    public Boolean existsByCpf(String cpf) {
        return customerRepository.existsByCpf(cpf);
    }

    public boolean isValidName(String name) {
        if (name == null) {
            return false;
        }
        String[] parts = name.trim().split("\\s+");
        if (parts.length != 2) {
            return false;
        }
        for (String part : parts) {
            if (part.length() < 3) {
                return false;
            }
        }
        return true;
    }
}