package br.com.oakpets.oakpets.services.impl;

import br.com.oakpets.oakpets.entities.Product;
import br.com.oakpets.oakpets.repositories.ProductRepository;
import br.com.oakpets.oakpets.services.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductserviceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;
    @Override
    @Transactional
    public Optional<Product> searchProduct(Long id) {
        return repository.findById(id);
    }
}
