package br.com.oakpets.oakpets.customer.controller;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.services.AddressService;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AddressService addressService;

    @GetMapping
    public List<Customer> listCustomer() {
        return customerService.findAllCustomersWithAddresses();
    }
    @GetMapping(value = "/address")
    public List<Address> listAddress() {
        return addressService.findAll();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Customer obj) {
        Customer newObj = customerService.update(id, obj);
        return ResponseEntity.ok().body(newObj);
    }

    @PutMapping(value = "/address/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Integer id, @RequestBody Address obj) {
        Address newObj = addressService.update(id, obj);
        return ResponseEntity.ok().body(newObj);
    }

    @DeleteMapping(value = "/address/{id}")
    public void updateAddress(@PathVariable Long id) {
        addressService.disabled(id);
    }
}
