package br.com.oakpets.oakpets.produto.controllers;

import br.com.oakpets.oakpets.produto.DTO.ProductDTO;
import br.com.oakpets.oakpets.produto.entities.Image;
import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.services.ImageService;
import br.com.oakpets.oakpets.produto.services.ProductService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/products")
@CrossOrigin(origins = "*")
public class ProductController {
    private final ObjectMapper mapper = new ObjectMapper();

    private final ProductService service;
    private final ImageService serviceImage;
    public ProductController(ProductService service, ImageService serviceImage) {
        this.service = service;
        this.serviceImage = serviceImage;
    }

    @GetMapping("/all")
    @JsonIgnoreProperties(value = "images")
    public List<Product> findAll() {
        List<Product> products = service.findALL();
        Collections.reverse(products);
        return products;
    }

    @GetMapping("/{id}/details")
    public ResponseEntity FindByID(@PathVariable Long id) {
        Optional<Product> product = service.searchProduct(id);

        if (product.isPresent()) {
            product.get().setImages(serviceImage.searchImage(id));
             return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.badRequest().body("Produto não encontrado");
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity createProduct(@RequestParam String data,
                                        @RequestParam(value = "files") List<MultipartFile> files,
                                        @RequestParam(required = false) String imageDefault) throws JsonProcessingException {

        var converte = mapper.readValue(data, ProductDTO.class);
        Product product = Product.builder()
                .name(converte.name())
                .status("ativo")
                .amount(converte.amount())
                .price(converte.price())
                .description(converte.description())
                .rate(converte.rate())
                .build();

        try {
            Product product1 = service.create(product);
            serviceImage.salvarArquivo(files, imageDefault, product1);
            return new ResponseEntity<>(product1, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/update")
    public ResponseEntity updateProduct(@RequestParam String data,
                                        @RequestParam(value = "files", required = false) List<MultipartFile> files,
                                        @RequestParam(required = false) String imageDefault,
                                        @RequestParam(required = false) List<Long> idImage) throws JsonProcessingException {

        var converte = mapper.readValue(data, ProductDTO.class);
        Product product = Product.builder()
                .idProduct(converte.idProduct())
                .name(converte.name())
                .amount(converte.amount())
                .price(converte.price())
                .description(converte.description())
                .rate(converte.rate())
                .build();

        try {
            service.update(product);
            if (files != null) {
                serviceImage.salvarArquivo(files, imageDefault, product);
            }

            if (idImage != null) {
                serviceImage.deleteImage(idImage);
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("{id}/status")
    public ResponseEntity status(@PathVariable Long id, @RequestBody ProductDTO data) {
        try {
            service.status(id, data);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/allProducts")
    public ResponseEntity allProduct() {

        try {
           List<Product> products = service.allProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro na listagem do produto " + e.getMessage());
        }


    }

}