package br.com.oakpets.oakpets.produto.services;

import br.com.oakpets.oakpets.produto.DTO.ProductDTO;
import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public  class ProductserviceImpl implements ProductService {

    private final ProductRepository repository;

    public ProductserviceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public Product create(Product product) {
        return repository.save(product);
    }

    @Override
    public List<Product> findALL() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Optional<Product> searchProduct(Long id) {
        return repository.findById(id);
    }

    @Override
    public void status(Long id, ProductDTO data) {
        Optional<Product> productOptional = repository.findById(id);

        if (productOptional.isEmpty()) {
            throw new RuntimeException("Usuario não encontrado");
        }

        productOptional.get().setStatus(data.status());
        repository.save(productOptional.get());
    }

    @Override
    public void update(Product product) {
        repository.save(product);
    }

    @Override
    public List<Product> allProducts() {
        return repository.findAllWithMainImages();
    }


    @Override
    public void qtd(ProductDTO data) {
        Optional<Product> productOptional = repository.findById(data.idProduct());

        if (productOptional.isEmpty()) {
            throw new RuntimeException("Usuario não encontrado");
        }

        productOptional.get().setAmount(data.amount());
        repository.save(productOptional.get());
    }


}
