package br.com.oakpets.oakpets.services;

import br.com.oakpets.oakpets.entities.Product;

import java.util.Optional;

public interface ProductService {

    Optional<Product> searchProduct(Long id);

}
