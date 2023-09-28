package br.com.oakpets.oakpets.controllers;

import br.com.oakpets.oakpets.entities.Product;
import br.com.oakpets.oakpets.repositories.ProductRepository;
import br.com.oakpets.oakpets.services.ProductService;
import br.com.oakpets.oakpets.services.impl.ProductserviceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

    @Autowired
    private ProductRepository repository;
    @Autowired
    private ProductService service;

    @GetMapping
    public List<Product> findAllWithMainImages() {
        List<Product> result = repository.findAllWithMainImages();
        return result;
    }
    @GetMapping("/{id}/details")
    public ResponseEntity FindByID(@PathVariable Long id) {
        Optional<Product> product = service.searchProduct(id);
        System.out.println(product.get().getRate());

        if (product.isPresent()) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.badRequest().body("Produto não encontrado");
        }

    }
}