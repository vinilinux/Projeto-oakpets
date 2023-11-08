package br.com.oakpets.oakpets.carrinho.DTO;

public record PedidosDTO(Integer customerId, String codPedido, Double valorTotal, Double valorFrete,
                         String tipoPagamento, Integer address, String data, ItemPedidoDTO []itemPedidoDTOS) {
}
