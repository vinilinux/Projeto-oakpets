package br.com.oakpets.oakpets.carrinho.entities;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "pedidos")
public class Pedidos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Pedido")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Customer")
    private Customer customer;

    @Column(name = "VALOR_TOTAL")
    private Double valorTotal;

    @Column(name = "VALOR_FRETE")
    private Double valorFrete;

    @Column(name = "TIPO_PAGAMENTO")
    private String tipoPagamento;

    @ManyToOne
    @JoinColumn(name = "ID_Address")
    @JsonIgnoreProperties("address")
    private Address address;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "DATA")
    private Date data;

    @OneToMany(mappedBy = "pedidos", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ItemPedidos> Itempedidos = new ArrayList<>();

}
