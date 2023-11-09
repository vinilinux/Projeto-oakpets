package br.com.oakpets.oakpets.carrinho.entities;

import br.com.oakpets.oakpets.customer.entities.Address;
import br.com.oakpets.oakpets.customer.entities.Customer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDate;
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
    @JoinColumn(name = "ID_Address")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "ID_Customer")
    private Customer customer;

    @Column(name = "VALOR_TOTAL")
    private Double valorTotal;

    @Column(name = "VALOR_FRETE")
    private Double valorFrete;

    @Column(name = "TIPO_PAGAMENTO")
    private String tipoPagamento;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "DATA")
    private LocalDate data;

    @OneToMany(mappedBy = "pedidos", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ItemPedidos> Itempedidos = new ArrayList<>();

}
