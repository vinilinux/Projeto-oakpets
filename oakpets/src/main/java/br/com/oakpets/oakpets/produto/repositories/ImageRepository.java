package br.com.oakpets.oakpets.produto.repositories;

import br.com.oakpets.oakpets.produto.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository <Image, String>{
}