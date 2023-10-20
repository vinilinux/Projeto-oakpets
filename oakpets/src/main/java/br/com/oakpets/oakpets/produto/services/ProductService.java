package br.com.oakpets.oakpets.produto.services;

import br.com.oakpets.oakpets.produto.entities.Image;
import br.com.oakpets.oakpets.produto.entities.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product create(Product product);

    List<Product> findALL();

    void editProduct(Product product);

    Optional<Product> searchProduct(Long id);

    List<Product> findAllWithMainImages();

    List<Image> salvarArquivo(List<MultipartFile> file);

}
