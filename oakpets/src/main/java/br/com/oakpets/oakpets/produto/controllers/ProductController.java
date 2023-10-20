package br.com.oakpets.oakpets.produto.controllers;

import br.com.oakpets.oakpets.produto.DTO.ProductDTO;
import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

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

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createProduct(@RequestBody ProductDTO data, @RequestParam("file") List<MultipartFile> files) {
        Product product = Product.builder()
                .name(data.name())
                .status("ativo")
                .amount(Integer.parseInt(data.amount()))
                .price(Double.parseDouble(data.price()))
                .description(data.description())
                .rate(Double.parseDouble(data.rate()))
                .images(service.salvarArquivo(files))
                .build();

        try {
            Product product1 = service.create(product);
            return new ResponseEntity<>(product1, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}