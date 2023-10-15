package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public Address update(Integer id, Address obj) {
        Address newObj = findById(id);

        newObj.setAddressKind(obj.getAddressKind());
        newObj.setStreet(obj.getStreet());
        newObj.setNumber(obj.getNumber());
        newObj.setComplement(obj.getComplement());
        newObj.setNeighborhood(obj.getNeighborhood());
        newObj.setCity(obj.getCity());
        newObj.setState(obj.getState());
        newObj.setZipCode(obj.getZipCode());

        return addressRepository.save(newObj);
    }
}
