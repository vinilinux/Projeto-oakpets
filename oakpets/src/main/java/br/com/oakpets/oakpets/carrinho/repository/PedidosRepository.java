package br.com.oakpets.oakpets.carrinho.repository;

import br.com.oakpets.oakpets.carrinho.entities.Pedidos;
import br.com.oakpets.oakpets.customer.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PedidosRepository extends JpaRepository<Pedidos, Long> {

    List<Pedidos> findAllByCustomer(Customer customer);

    List<Pedidos> getOneByCustomer(Customer customer);

}
