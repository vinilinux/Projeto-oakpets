package br.com.oakpets.oakpets.carrinho.repository;

import br.com.oakpets.oakpets.carrinho.entities.ItemPedidos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface itemPedidoRepository extends JpaRepository<ItemPedidos, Long> {
}
