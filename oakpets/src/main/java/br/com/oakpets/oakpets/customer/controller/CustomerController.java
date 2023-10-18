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

    @GetMapping(value = "/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        Customer customer = customerService.findById(id);
        if(customer != null)
            return ResponseEntity.ok().body(customer);
        else
            return ResponseEntity.notFound().build();
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


}
