package br.com.oakpets.oakpets.carrinho.services;

import br.com.oakpets.oakpets.carrinho.DTO.RespDTO;
import br.com.oakpets.oakpets.carrinho.entities.ItemPedidos;
import br.com.oakpets.oakpets.carrinho.entities.Pedidos;
import br.com.oakpets.oakpets.carrinho.repository.PedidosRepository;
import br.com.oakpets.oakpets.carrinho.repository.itemPedidoRepository;
import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidosServiceImpl implements PedidosService{

    @Autowired
    private PedidosRepository pedidosRepository;
    @Autowired
    private itemPedidoRepository itemPedidoRepository;
   @Autowired
    private CustomerService customerService;

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
    public List<RespDTO> findAll(Integer id) {

        Customer customer = customerService.findByCustomerId(id);
        List<Pedidos> pedidos = pedidosRepository.findAllByCustomer(customer);

        List<RespDTO> RespDTO = pedidos.stream()
                .map(pedido -> new RespDTO(pedido.getId(), pedido.getData(), pedido.getStatus(), pedido.getValorTotal()))
                .toList();

        return RespDTO;

    }
}
