package br.com.oakpets.oakpets.customer.controller;

import br.com.oakpets.oakpets.customer.DTO.AddressRequest;
import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.repository.AddressRepository;
import br.com.oakpets.oakpets.customer.repository.CustomerRepository;
import br.com.oakpets.oakpets.customer.services.AddressService;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;



@RestController
@RequestMapping(value = "/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @GetMapping
    public List<Customer> listCustomer() {
        return customerService.findAllCustomersWithAddresses();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        Customer customer = customerService.findById(id);
        if(customer != null)
            return ResponseEntity.ok().body(customer);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer obj) {
        Customer newObj = customerService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newObj.getId_customer()).toUri();
        return ResponseEntity.created(uri).build();
    }

    //Melhorar o código da função abaixo
    @PostMapping(value = "/address/create")
    public ResponseEntity<Address> createCustomerAddress(@RequestBody AddressRequest addressRequest) {
        Integer customerId = addressRequest.getIdCustomer();

        Customer customer = customerRepository.findById(Long.valueOf(customerId))
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));

        Address address = new Address();
        address.setAddressKind(addressRequest.getAddressKind());
        address.setStreet(addressRequest.getStreet());
        address.setNumber(addressRequest.getNumber());
        address.setComplement(addressRequest.getComplement());
        address.setNeighborhood(addressRequest.getNeighborhood());
        address.setCity(addressRequest.getCity());
        address.setState(addressRequest.getState());
        address.setZipCode(addressRequest.getZipCode());
        address.setEnabled(addressRequest.getEnabled());

        address.setIdCustomer(customer);

        Address newAddress = addressService.create(address);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/Address/{id}")
                .buildAndExpand(newAddress.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @GetMapping(value = "/check-email")
    public ResponseEntity<Boolean> checkEmailExistence(@RequestParam String email) {
        Boolean exists = customerService.doesEmailExist(email);
        return ResponseEntity.ok(exists);
    }


    @PutMapping(value = "/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Customer obj) {
        Customer updatedCustomer = customerService.updateCustomerAndAddresses(id, obj);
        return ResponseEntity.ok().body(updatedCustomer);
    }

    @DeleteMapping(value = "/address/{id}")
    public void updateAddress(@PathVariable Long id) {
        addressService.disabled(id);
    }

    @GetMapping("/address")
    public ResponseEntity findAll() {
        return ResponseEntity.ok(addressService.findAll());
    }

    @GetMapping("/addressEnabled")
    public List <Address> findAllActive (){
        return addressService.findByEnabled(true);
    }


    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

}
