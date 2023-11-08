package br.com.oakpets.oakpets.carrinho.repository;

import br.com.oakpets.oakpets.carrinho.entities.Pedidos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PedidosRepository extends JpaRepository<Pedidos, Long> {

    List<Pedidos> findAllById(Long id);
}
