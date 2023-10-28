package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Address;
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
    private AddressService addressService;

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

        if (updatedCustomer != null) {
            if (!isValidName(customer.getName())) {
                throw new RuntimeException("O nome do cliente deve ter 2 palavras e no mínimo 3 letras em cada palavra.");
            } else {
                updatedCustomer.setName(customer.getName());
            }

            if (!customer.getEmail().equals(updatedCustomer.getEmail())) {
                if (doesEmailExist(customer.getEmail())) {
                    throw new RuntimeException("E-mail já cadastrado!");
                } else {
                    updatedCustomer.setEmail(customer.getEmail());
                }
            }

            if (!customer.getCpf().equals(updatedCustomer.getCpf())) {
                if (existsByCpf(customer.getCpf())) {
                    throw new RuntimeException("CPF inválido!");
                } else {
                    updatedCustomer.setCpf(customer.getCpf());
                }
            }

            if (!customer.getPassword().equals(updatedCustomer.getPassword())) {
                String encryptedPassword = passwordEncoder.encode(customer.getPassword());
                updatedCustomer.setPassword(encryptedPassword);
            }

            updatedCustomer.setBDay(customer.getBDay());
            updatedCustomer.setGender(customer.getGender());

            return customerRepository.save(updatedCustomer);
        } else {
            return null;
        }
    }

    @Override
    public Address updateAddress(Integer customerId, Integer addressId, Address updatedAddress) {
        Customer customer = findByCustomerId(customerId);
        if (customer == null) {
            return null;
        }

        Address existingAddress = addressService.findAddressById(addressId);
        if (existingAddress == null) {
            return null;
        }

        existingAddress.setAddressKind(updatedAddress.getAddressKind());
        existingAddress.setStreet(updatedAddress.getStreet());
        existingAddress.setNumber(updatedAddress.getNumber());
        existingAddress.setComplement(updatedAddress.getComplement());
        existingAddress.setNeighborhood(updatedAddress.getNeighborhood());
        existingAddress.setCity(updatedAddress.getCity());
        existingAddress.setState(updatedAddress.getState());
        existingAddress.setZipCode(updatedAddress.getZipCode());
        existingAddress.setEnabled(updatedAddress.getEnabled());
        existingAddress.setAddressDefault(updatedAddress.getAddressDefault());

        addressRepository.save(existingAddress);

        return existingAddress;
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