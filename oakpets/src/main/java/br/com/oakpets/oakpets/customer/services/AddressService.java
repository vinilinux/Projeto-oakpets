package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Address;

import java.util.List;

public interface AddressService {

    List<Address> findAll();

    Address update(Integer id, Address obj);
}
