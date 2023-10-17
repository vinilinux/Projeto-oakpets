package br.com.oakpets.oakpets.produto.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PRODUCT")
    private Long idProduct;

    @Column(name = "NAME")
    @NotBlank(message = "{name.not.blank}")
    @Size(min = 2, max = 200, message = "{max.character}")
    private String name;

    @Column(name = "DESCRIPTION")
    @Size(min = 2, max = 2000, message = "{max.character}")
    private String description;
    
    @Column(name = "STATUS")
    private String status;

    @Column(name = "RATING")
    @PositiveOrZero(message = "{positivoorzero}")
    @DecimalMax(value = "5.0", message = "{max.character}")
    private double rate;

    @Column(name = "PRICE")
    @PositiveOrZero(message = "{positivoorzero}")
    private double price;

    @Column(name = "AMOUNT")
    @PositiveOrZero(message = "{positivoorzero}")
    private int amount;

    @OneToMany(mappedBy = "idProduct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images = new ArrayList<>();
}