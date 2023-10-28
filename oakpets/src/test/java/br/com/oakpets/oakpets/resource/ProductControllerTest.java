package br.com.oakpets.oakpets.resource;

import br.com.oakpets.oakpets.produto.services.ProductService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ProductControllerTest {

    @Autowired
    ProductService service;
}
