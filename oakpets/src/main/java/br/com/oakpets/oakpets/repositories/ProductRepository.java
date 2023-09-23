package br.com.oakpets.oakpets.repositories;

import br.com.oakpets.oakpets.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository  <Product, String>{
}