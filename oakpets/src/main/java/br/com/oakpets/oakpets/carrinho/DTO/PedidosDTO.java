package br.com.oakpets.oakpets.carrinho.DTO;

import br.com.oakpets.oakpets.carrinho.entities.Pedidos;

public record PedidosDTO(Integer customerId, String status, Double valorTotal, Double valorFrete,
                         String tipoPagamento, Integer address, String data, ItemPedidoDTO []itemPedidoDTOS) {

}
