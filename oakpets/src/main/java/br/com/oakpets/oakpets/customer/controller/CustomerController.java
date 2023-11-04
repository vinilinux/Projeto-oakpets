package br.com.oakpets.oakpets.customer.controller;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.repository.AddressRepository;
import br.com.oakpets.oakpets.customer.repository.CustomerRepository;
import br.com.oakpets.oakpets.customer.services.AddressService;
import br.com.oakpets.oakpets.customer.services.CustomerService;
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

    @GetMapping
    public List<Customer> listCustomer() {
        return customerService.findAllCustomersWithAddresses();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        Customer customer = customerService.findByCustomerId(id);

        if(customer != null)
            return ResponseEntity.ok().body(customer);
        else
            return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/address/{id}")
    public ResponseEntity<Customer> getCustomerAddressById(@PathVariable Integer id) {
        Customer customer = customerService.findCustomerWithActiveAddressesById(id);

        if(customer != null)
            return ResponseEntity.ok().body(customer);
        else
            return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/addressDefault/{id}")
    public ResponseEntity<Customer> getCustomerDefaultAddressById(@PathVariable Integer id) {
        Customer customer = customerService.findCustomerWithDefaultAddressById(id);

        if(customer != null)
            return ResponseEntity.ok().body(customer);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer obj) {
        Customer newObj = customerService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newObj.getCustomerId()).toUri();
        return ResponseEntity.created(uri).build();
    }

   @GetMapping(value = "/check-email")
    public ResponseEntity<Boolean> checkEmailExistence(@RequestParam String email) {
        Boolean exists = customerService.doesEmailExist(email);
        return ResponseEntity.ok(exists);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Customer obj) {
        Customer updatedCustomer = customerService.update(id, obj);
        return ResponseEntity.ok().body(updatedCustomer);
    }

    @PutMapping("/{clienteId}/enderecos/{enderecoId}")
    public ResponseEntity<Object> updateEndereco(
            @PathVariable Integer clienteId,
            @PathVariable Integer enderecoId,
            @RequestBody Address updatedAddress
    ) {
        Address updated = customerService.updateAddress(clienteId, enderecoId, updatedAddress);

        if (updated != null) {
            return ResponseEntity.ok().body(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"Endereço não encontrado\"}");
        }
    }


    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}