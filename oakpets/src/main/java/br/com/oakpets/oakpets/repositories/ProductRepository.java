package br.com.oakpets.oakpets.repositories;

import br.com.oakpets.oakpets.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository  <Product, String>{

    @Query("SELECT DISTINCT p FROM Product p JOIN FETCH p.images img WHERE img.image_default = 'yes'")
    List<Product> findAllWithMainImages();

}