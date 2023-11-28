package br.com.oakpets.oakpets.customer.services;

import br.com.oakpets.oakpets.customer.entities.Address;

import java.util.List;

public interface AddressService {

    List<Address> findAll();

    List<Address> findByEnabled(boolean enabled);

    Address update(Integer id, Address obj);

    void disabled(Long id);

    Address create(Address obj);

    Boolean doesBillingAddressExist(Integer id);

    Address findAddressById(Integer id);

    List<Address> findDeliveryAddressesByCustomerId(Integer id);

    Boolean doesDeliveryAddressExist(Integer id);

    Address getDefaultAddressByCustomerId(Integer customerId);

    Address updateAddressDefault(Address address);

    Boolean doesDefaultAddressExist(Integer id);
}
