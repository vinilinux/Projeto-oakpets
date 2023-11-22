package br.com.oakpets.oakpets.carrinho.repository;

import br.com.oakpets.oakpets.carrinho.entities.ItemPedidos;
import br.com.oakpets.oakpets.carrinho.entities.Pedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface itemPedidoRepository extends JpaRepository<ItemPedidos, Long> {
}



