package br.com.oakpets.oakpets.carrinho.services;

import br.com.oakpets.oakpets.carrinho.DTO.ItemPedidoDTO;
import br.com.oakpets.oakpets.carrinho.DTO.RespDTO;
import br.com.oakpets.oakpets.carrinho.entities.ItemPedidos;
import br.com.oakpets.oakpets.carrinho.entities.Pedidos;

import java.util.List;
import java.util.Optional;

public interface PedidosService {
    Pedidos criarPedido(Pedidos pedidos);

    void salvarItens(Pedidos pedidos, List<ItemPedidos> itemPedidos);

    List<RespDTO> findAll(Integer id);


    List<Pedidos> obterTodosOsPedidosOrdenados();

    void atualizarPedido(Pedidos pedido);

    Optional<Pedidos> findById(Long id);



    Pedidos findById (long id);


}
