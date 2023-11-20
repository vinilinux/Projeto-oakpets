package br.com.oakpets.oakpets.carrinho.services;

import br.com.oakpets.oakpets.carrinho.DTO.ItemPedidoDTO;
import br.com.oakpets.oakpets.carrinho.DTO.RespDTO;
import br.com.oakpets.oakpets.carrinho.entities.ItemPedidos;
import br.com.oakpets.oakpets.carrinho.entities.Pedidos;

import java.util.List;

public interface PedidosService {
    Pedidos criarPedido(Pedidos pedidos);

    void salvarItens(Pedidos pedidos, List<ItemPedidos> itemPedidos);

    List<RespDTO> findAll(Integer id);

    Pedidos findById (long id);


}
