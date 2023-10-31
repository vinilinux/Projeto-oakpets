package br.com.oakpets.oakpets.carrinho.entities;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pedidos")
public class Pedidos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Pedido")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Customer")
    private Customer customer;

    @Column(name = "COD_PEDIDO")
    private String codPedido;

    @Column(name = "VALOR_TOTAL")
    private Double valorTotal;

    @Column(name = "VALOR_FRETE")
    private Double valorFrete;

    @Column(name = "TIPO_PAGAMENTO")
    private String tipoPagamento;

    @OneToOne
    @JoinColumn(name = "ID_Address")
    private Address address;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "DATA")
    private Date data;

}
