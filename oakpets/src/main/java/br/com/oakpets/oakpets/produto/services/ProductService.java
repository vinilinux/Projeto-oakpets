package br.com.oakpets.oakpets.produto.services;

import br.com.oakpets.oakpets.produto.DTO.ProductDTO;
import br.com.oakpets.oakpets.produto.entities.Image;
import br.com.oakpets.oakpets.produto.entities.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product create(Product product);

    List<Product> findALL();

    Optional<Product> searchProduct(Long id);

    void status(Long id, ProductDTO data);

    void update(Product product);

    List<Product> allProducts();

}
