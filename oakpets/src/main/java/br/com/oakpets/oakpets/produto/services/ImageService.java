package br.com.oakpets.oakpets.produto.services;
import br.com.oakpets.oakpets.produto.entities.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    void salvarArquivo(List<MultipartFile> files, String imageDefault, Product product);
}
