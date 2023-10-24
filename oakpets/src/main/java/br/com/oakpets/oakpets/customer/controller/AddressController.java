package br.com.oakpets.oakpets.customer.controller;


import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.repository.AddressRepository;
import br.com.oakpets.oakpets.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/address")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CustomerRepository customerRepository; // Supondo que você tenha um repositório para Customer

    @PostMapping("/create")
    public ResponseEntity<Address> createAddress(@RequestBody Address address) {
        try {
            // Primeiro, recupere o cliente existente pelo ID, ou crie um novo se necessário
            Customer customer = address.getIdCustomer();


            // Associe o endereço ao cliente
            customer.addAddress(address);

            // Marque o endereço como habilitado (se necessário)
            address.setEnabled(true);

            // Salve o endereço
            Address savedAddress = addressRepository.save(address);

            // Salve o cliente se for novo
            if (customer.getId_customer() == null) {
                customerRepository.save(customer);
            }

            return new ResponseEntity<>(savedAddress, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

