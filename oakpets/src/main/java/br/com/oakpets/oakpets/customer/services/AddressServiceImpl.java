package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Address findById(Integer id) {
        return addressRepository.findById(id);
    }

    public List<Address> findAll() {
        return addressRepository.findAll();
    }

    @Override
    public void disabled(Long id) {
        Optional<Address> optAddress =  addressRepository.findById(id);
        Address address = optAddress.get();
        address.setEnabled(false);
        addressRepository.save(address);
    }

    @Override
    public Address update(Integer id, Address obj) {
        Address newObj = findById(id);

        obj.setId(newObj.getId());

        return addressRepository.save(obj);
    }
}
