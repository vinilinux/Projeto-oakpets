package br.com.oakpets.oakpets.customer.controller;


import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.repository.AddressRepository;
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


    @PostMapping("/create")
    public ResponseEntity<Address> createAddress(@RequestBody Address address) {
        try {
            address.setEnabled(true);
            Address savedAddress = addressRepository.save(address);
            return new ResponseEntity<>(savedAddress, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
