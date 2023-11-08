package br.com.oakpets.oakpets.carrinho.services;

import br.com.oakpets.oakpets.carrinho.entities.ItemPedidos;
import br.com.oakpets.oakpets.carrinho.entities.Pedidos;
import br.com.oakpets.oakpets.carrinho.repository.PedidosRepository;
import br.com.oakpets.oakpets.carrinho.repository.itemPedidoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidosServiceImpl implements PedidosService{

    @Autowired
    private PedidosRepository pedidosRepository;
    @Autowired
    private itemPedidoRepository itemPedidoRepository;

    @Override
    public Pedidos criarPedido(Pedidos pedidos) {

        try {
            pedidosRepository.saveAndFlush(pedidos);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return pedidos;
    }

    @Override
    public void salvarItens(Pedidos pedidos, List<ItemPedidos> itemPedidos) {

        for (ItemPedidos item : itemPedidos) {
            item.setPedidos(pedidos);
        }
        itemPedidoRepository.saveAll(itemPedidos);
    }

    @Override
    @Transactional
    public List<Pedidos> findAll(Long id) {
        return pedidosRepository.findAllById(id);
    }
}
