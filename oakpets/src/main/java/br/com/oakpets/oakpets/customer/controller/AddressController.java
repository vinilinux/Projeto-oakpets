package br.com.oakpets.oakpets.customer.controller;


import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.repository.CustomerRepository;
import br.com.oakpets.oakpets.customer.services.AddressService;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/address")
public class AddressController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AddressService addressService;

    @PostMapping("/create/{customerId}")
    public ResponseEntity<Address> createAddressForCustomer(
            @PathVariable Integer customerId,
            @RequestBody Address address) {

        Customer customer = customerService.findByIdWithAddresses(customerId);

        if (customer == null) {
            return ResponseEntity.notFound().build();
        }

        customer.addAddress(address);
        customerRepository.save(customer);

        return ResponseEntity.ok(address);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable Integer id) {
        Address address = addressService.findAddressById(id);
        if(address != null)
            return ResponseEntity.ok().body(address);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping(value = "/delete/{id}")
    public void updateAddress(@PathVariable Long id) {
        addressService.disabled(id);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Integer id, @RequestBody Address obj) {
        Address updatedAddress = addressService.update(id, obj);
        return ResponseEntity.ok().body(updatedAddress);
    }

    @PutMapping(value = "/updateAddressDefault/{id}")
    public ResponseEntity<Address> updateAddressDefault(@PathVariable Integer id, @RequestBody Boolean addressDefault) {
        Address address = addressService.findAddressById(id);

        if (address == null) {
            return ResponseEntity.notFound().build();
        }

        address.setAddressDefault(addressDefault);
        Address updatedAddress = addressService.updateAddressDefault(address);

        return ResponseEntity.ok(updatedAddress);
    }


    @GetMapping(value = "/checkBillingAddress/{id}")
    public ResponseEntity<Boolean> checkBillingAddress (@PathVariable Integer id) {
        Boolean exists = addressService.doesBillingAddressExist(id);
        return ResponseEntity.ok(exists);
    }

    @GetMapping(value = "/checkDeliveryAddress/{id}")
    public ResponseEntity<Boolean> checkDeliveryAddress (@PathVariable Integer id) {
        Boolean exists = addressService.doesDeliveryAddressExist(id);
        return ResponseEntity.ok(exists);
    }

    @GetMapping(value = "/checkDefaultAddress/{id}")
    public ResponseEntity<Boolean> checkDefaultAddress (@PathVariable Integer id) {
        Boolean exists = addressService.doesDefaultAddressExist(id);
        return ResponseEntity.ok(exists);
    }

}

