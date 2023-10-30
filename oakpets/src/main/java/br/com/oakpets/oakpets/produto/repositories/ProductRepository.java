package br.com.oakpets.oakpets.produto.repositories;

import br.com.oakpets.oakpets.produto.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository  <Product, Long>{

    @Query("SELECT DISTINCT p FROM Product p JOIN FETCH p.images img WHERE img.imageDefault = true AND p.status = " +
            "'ativo'")
    List<Product> findAllWithMainImages();


    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.idProduct = :productId")
    Optional<Product> findProductWithImagesById(@Param("productId") Long productId);



}