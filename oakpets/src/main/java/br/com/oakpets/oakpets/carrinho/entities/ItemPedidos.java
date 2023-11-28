package br.com.oakpets.oakpets.carrinho.entities;

import br.com.oakpets.oakpets.produto.entities.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "item_pedidos")
public class ItemPedidos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ITEM_PEDIDOS")
    private Long id;

    @Column(name = "QUANTIDADE")
    private Integer quantidade;

    @Column(name = "VALOR")
    private Double valor;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ID_PEDIDOS")
    private Pedidos pedidos;


    @ManyToOne
    @JoinColumn(name = "ID_PRODUCT")
    private Product product;
}
