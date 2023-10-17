package br.com.oakpets.oakpets.produto.services;

import br.com.oakpets.oakpets.produto.entities.Image;
import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.repositories.ProductRepository;
import br.com.oakpets.oakpets.produto.services.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
        return null;
    }

    @Override
    public void editProduct(Product product) {

    }

    @Override
    @Transactional
    public Optional<Product> searchProduct(Long id) {
        return repository.findById(id);
    }

    public List<Product> findAllWithMainImages() {
        return repository.findAllWithMainImages();
    }

    public List<Image> salvarArquivo(MultipartFile file[]) {

        List<Image> imageList = new ArrayList<>();

        try {
            for (MultipartFile newFile : file) {
                Long currentTime = new Date().getTime();
                String fileName =
                        pathArquivo + currentTime.toString().concat("-").concat(Objects.requireNonNull(newFile.getOriginalFilename()).replace(" "
                                , ""));
                Files.copy(newFile.getInputStream(), Path.of(fileName), StandardCopyOption.REPLACE_EXISTING);

                Image image = Image.builder()
                        .imagePath(fileName)
                        .build();
                imageList.add(image);
            }

            return imageList;
        } catch (IOException e) {
            throw new RuntimeException(e + " Falha no upload");
        }
    }

    private String extrairExtensao(String nomeArquivo) {
        int i = nomeArquivo.lastIndexOf(".");
        return nomeArquivo.substring(i + 1);
    }
}
