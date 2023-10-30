package br.com.oakpets.oakpets.produto.repositories;

import br.com.oakpets.oakpets.produto.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImageRepository extends JpaRepository <Image, Long>{

    List<Image> findImagesByProduct_IdProduct(@Param("productId") Long productID);

    @Modifying
    @Query("DELETE FROM Image e WHERE e.idImage = :id")
    void deleteImagesByIdImage(@Param("id") Long idImage);
}