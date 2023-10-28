package br.com.oakpets.oakpets.produto.services;

import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.repositories.ProductRepository;
import br.com.oakpets.oakpets.produto.services.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<Product> findAllWithMainImages() {
        return repository.findAllWithMainImages();
    }
}
