package br.com.oakpets.oakpets.repositories;

import br.com.oakpets.oakpets.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository <Image, String>{
}