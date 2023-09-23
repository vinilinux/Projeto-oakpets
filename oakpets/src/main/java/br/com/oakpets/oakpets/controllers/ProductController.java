package br.com.oakpets.oakpets.controllers;

import br.com.oakpets.oakpets.entities.Product;
import br.com.oakpets.oakpets.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    /*@GetMapping
    public List<Product> findAll() {
        List<Product> result = repository.findAll();
        return result;
    }*/

    //Faz o select e trás somente a imagem Default para a lista
    @GetMapping
    public List<Product> findAllWithMainImages() {
        List<Product> result = repository.findAllWithMainImages();
        return result;
    }
}