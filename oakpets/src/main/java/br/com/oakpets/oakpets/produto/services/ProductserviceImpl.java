package br.com.oakpets.oakpets.produto.services;

import br.com.oakpets.oakpets.produto.DTO.ProductDTO;
import br.com.oakpets.oakpets.produto.entities.Image;
import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.repositories.ProductRepository;
import br.com.oakpets.oakpets.usuario.DTO.UserDTO;
import br.com.oakpets.oakpets.usuario.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class ProductserviceImpl implements ProductService {

    private final ProductRepository repository;
    private final String pathArquivo;

    public ProductserviceImpl(ProductRepository repository, @Value("${app.path.arquivos}") String pathArquivo) {
        this.repository = repository;
        this.pathArquivo = pathArquivo;
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
    public void editProduct(Product product) {

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
}
