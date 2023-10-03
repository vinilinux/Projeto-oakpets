package br.com.oakpets.oakpets.model.service;

import br.com.oakpets.oakpets.entities.Product;
import br.com.oakpets.oakpets.services.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.util.Assert;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ProductServiceTest {

    @Autowired
    ProductService service;

    @Test
    public void deveObeterProdutoPorID() {
        //Execucao
        Optional<Product> result = service.searchProduct(1L);

        //Verificacao
        Assertions.assertTrue(result.isPresent());
    }

}
