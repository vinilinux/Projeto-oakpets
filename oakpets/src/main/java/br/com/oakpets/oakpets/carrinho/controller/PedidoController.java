package br.com.oakpets.oakpets.carrinho.controller;

import br.com.oakpets.oakpets.carrinho.DTO.ItemPedidoDTO;
import br.com.oakpets.oakpets.carrinho.DTO.PedidosDTO;
import br.com.oakpets.oakpets.carrinho.entities.ItemPedidos;
import br.com.oakpets.oakpets.carrinho.entities.Pedidos;
import br.com.oakpets.oakpets.carrinho.services.PedidosService;
import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.services.AddressService;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import br.com.oakpets.oakpets.produto.entities.Product;
import br.com.oakpets.oakpets.produto.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;


@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidosService service;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AddressService  addressService;

    @Autowired
    private ProductService  productService;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody PedidosDTO dados) {
        SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy");

        try {
            Customer customer = customerService.findByCustomerId(dados.customerId());
            Address address = addressService.findAddressById(dados.address());

            if (customer == null || address == null) {
                return ResponseEntity.badRequest().body("Usuário inválido");
            }

            List<ItemPedidos> itemPedidos = new ArrayList<>();

            for (ItemPedidoDTO item : dados.itemPedidoDTOS()) {
                Optional<Product> product = productService.searchProduct(item.productId());
                if (product.isEmpty() || product.get().getAmount() < item.quantidade()) {
                    return ResponseEntity.badRequest().body("Quantidade insuficiente");
                }
                ItemPedidos itens = ItemPedidos.builder()
                        .quantidade(item.quantidade())
                        .valor(product.get().getPrice() * item.quantidade())
                        .product(product.get())
                        .build();
                itemPedidos.add(itens);
            }

            Pedidos pedidos = Pedidos.builder()
                    .customer(customer)
                    .valorTotal(dados.valorTotal())
                    .valorFrete(dados.valorFrete())
                    .tipoPagamento(dados.tipoPagamento())
                    .address(address)
                    .status("Aguardando Pagamento")
                    .data(fmt.parse(dados.data()))
                    .build();

            Pedidos savedPedido = service.criarPedido(pedidos);
            service.salvarItens(savedPedido, itemPedidos);

            // Retorna um objeto que inclui informações sobre o pedido criado
            Map<String, Object> response = new HashMap<>();
            response.put("numeroDoPedido", savedPedido.getId());
            response.put("valorTotal", savedPedido.getValorTotal());
            response.put("gravadoNoBanco", true);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Falha ao salvar o pedido");
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity findAll(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(service.findAll(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Map<String, Object>>> obterTodosOsPedidos() {
        try {
            List<Pedidos> pedidos = service.obterTodosOsPedidosOrdenados();
            List<Map<String, Object>> pedidosFormatados = new ArrayList<>();

            for (Pedidos pedido : pedidos) {
                Map<String, Object> pedidoFormatado = new HashMap<>();
                pedidoFormatado.put("numeroPedido", pedido.getId());
                pedidoFormatado.put("dataPedido", pedido.getData());
                pedidoFormatado.put("valorTotal", pedido.getValorTotal());
                pedidoFormatado.put("status", pedido.getStatus());

                pedidosFormatados.add(pedidoFormatado);
            }

            return ResponseEntity.ok(pedidosFormatados);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/obteridpedido/{id}")
    public ResponseEntity<?> obterDetalhesPedidoPorId(@PathVariable Long id) {
        try {
            Optional<Pedidos> pedidoOptional = service.findById(id);
            if (pedidoOptional.isPresent()) {
                Pedidos pedido = pedidoOptional.get();


                Map<String, Object> response = new HashMap<>();
                response.put("numeroDoPedido", pedido.getId());
                response.put("dataPedido", pedido.getData());
                response.put("valorTotal", pedido.getValorTotal());
                response.put("status", pedido.getStatus());

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao obter detalhes do pedido por ID");
        }
    }



    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> requestBody) {

        try {
            Optional<Pedidos> pedidoOptional = service.findById(id);
            if (pedidoOptional.isPresent()) {
                Pedidos pedido = pedidoOptional.get();
                String novoStatus = requestBody.get("novoStatus");


                pedido.setStatus(novoStatus);


                service.atualizarPedido(pedido);

                return ResponseEntity.ok("Status atualizado com sucesso");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar status");
        }
    }






    @GetMapping("/detalhePedido/{id}")
    public ResponseEntity findById(@PathVariable long id) {
        try {
            return ResponseEntity.ok(service.findById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}