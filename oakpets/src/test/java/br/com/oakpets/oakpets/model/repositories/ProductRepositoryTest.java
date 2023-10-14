package br.com.oakpets.oakpets.model.repositories;

import br.com.oakpets.oakpets.produto.entities.Image;
import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ProductRepositoryTest {

    @Autowired
    ProductRepository repository;

    Image image;

    @Test
    @Transactional
    public void deveBuscarUmProdutoPeloID() {

        //verificação
        Optional<Product> product = repository.findById(1L);
        if (product.isPresent()) {
            Product produtoEncontrado = product.get();
            System.out.println("ID do Produto: " + produtoEncontrado.getIdProduct());
            System.out.println("Nome do Produto: " + produtoEncontrado.getName());
            System.out.println("Descrição do Produto: " + produtoEncontrado.getDescription());
            System.out.println("Status do Produto: " + produtoEncontrado.getStatus());
            System.out.println("Classificação do Produto: " + produtoEncontrado.getRate());
            System.out.println("Preço do Produto: " + produtoEncontrado.getPrice());
            System.out.println("Quantidade do Produto: " + produtoEncontrado.getAmount());

            List<Image> images = produtoEncontrado.getImages();
            if (images != null) {
                for (Image image : images) {
                    System.out.println("ID da Imagem: " + image.getIdImage());
                    System.out.println("Image Default " + image.getImageDefault());
                }
            } else {
                System.out.println("Nenhuma imagem associada a este produto.");
            }
        } else {
            System.out.println("Produto não encontrado.");
        }

        Assertions.assertTrue(product.isPresent());

    }
}
