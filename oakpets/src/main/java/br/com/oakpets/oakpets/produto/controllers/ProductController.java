package br.com.oakpets.oakpets.produto.controllers;

import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.repositories.ProductRepository;
import br.com.oakpets.oakpets.produto.services.ProductService;
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
        return service.findAllWithMainImages();
    }
    @GetMapping("/{id}/details")
    public ResponseEntity FindByID(@PathVariable Long id) {
        Optional<Product> product = service.searchProduct(id);

        if (product.isPresent()) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.badRequest().body("Produto não encontrado");
        }

    }
}