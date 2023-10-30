package br.com.oakpets.oakpets.produto.services;

import br.com.oakpets.oakpets.produto.entities.Image;
import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.repositories.ImageRepository;
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
public class ImageServiceImpl implements ImageService {
    private final ImageRepository repository;
    private final String pathArquivo;

    public ImageServiceImpl(ImageRepository repository, @Value("${app.path.arquivos}") String pathArquivo) {
        this.repository = repository;
        this.pathArquivo = pathArquivo;
    }

    @Override
    public void salvarArquivo(List<MultipartFile> file, String imageDefault, Product product) {

        List<Image> imageList = new ArrayList<>();

        try {
            for (MultipartFile newFile : file) {
                Long currentTime = new Date().getTime();
                String fileName = currentTime.toString().concat("-").concat(Objects.requireNonNull(newFile.getOriginalFilename()).replace(" ", ""));
                Files.copy(newFile.getInputStream(), Path.of(pathArquivo + fileName),
                        StandardCopyOption.REPLACE_EXISTING);

                Image image = Image.builder()
                        .imageDefault(newFile.getOriginalFilename().equals(imageDefault))
                        .imagePath("img/" + fileName)
                        .product(product)
                        .build();

                imageList.add(image);
            }
            repository.saveAll(imageList);
        } catch (IOException e) {
            throw new RuntimeException(e + " Falha no upload");
        }
    }

    @Override
    public List<Image> searchImage(Long id) {
        return repository.findImagesByProduct_IdProduct(id);
    }

    @Override
    @Transactional
    public void deleteImage(List<Long> idImage) {
        for (Long id : idImage) {
            try {
                repository.deleteImagesByIdImage(id);

            } catch (Exception e) {
                throw new RuntimeException(e + " Falha ao deletar imagem");
            }
        }
    }

}
