package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.repository.AddressRepository;
import br.com.oakpets.oakpets.customer.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

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

    @Transactional
    public Customer updateCustomerAndAddresses(Integer customerId, Customer customer) {
        Customer existingCustomer = findById(customerId);

        if (existingCustomer != null) {
            existingCustomer.setName(customer.getName());
            existingCustomer.setBDay(customer.getBDay());
            System.out.println(customer.getBDay());
            existingCustomer.setCpf(customer.getCpf());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setPassword(customer.getPassword());
            existingCustomer.setGender(customer.getGender());

            for (Address address : customer.getAddresses()) {
                Optional<Address> optExistingAddress;
                optExistingAddress = addressRepository.findById(address.getId());
                Address existingAddress = optExistingAddress.orElse(null);
                if (existingAddress != null) {
                    existingAddress.setAddressKind(address.getAddressKind());
                    existingAddress.setStreet(address.getStreet());
                    existingAddress.setNumber(address.getNumber());
                    existingAddress.setComplement(address.getComplement());
                    existingAddress.setNeighborhood(address.getNeighborhood());
                    existingAddress.setCity(address.getCity());
                    existingAddress.setState(address.getState());
                    existingAddress.setZipCode(address.getZipCode());

                    addressRepository.save(existingAddress);
                }
            }

            return customerRepository.save(existingCustomer);
        } else {
            return null;
        }
    }

    public Customer findById(Integer id) {
        return customerRepository.findByIdWithAddresses(id);
    }

    @Override
    public Customer findByIdWithAddresses(Integer id) {
        return customerRepository.findByIdWithAddresses(id);
    }
}