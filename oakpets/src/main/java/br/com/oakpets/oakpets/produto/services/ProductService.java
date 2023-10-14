package br.com.oakpets.oakpets.produto.services;

import br.com.oakpets.oakpets.produto.entities.Product;

import java.util.Optional;

public interface ProductService {

    Optional<Product> searchProduct(Long id);

}
