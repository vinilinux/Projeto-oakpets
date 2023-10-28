package br.com.oakpets.oakpets.produto.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PRODUCT")
    private Long idProduct;

    @Column(name = "NAME_PRODUCT")
    private String name;

    @Column(name = "DESCRIPTION_PRODUCT")
    private String description;
    
    @Column(name = "STATUS")
    private String status;

    @Column(name = "RATING_PRODUCT")
    private double rate;

    @Column(name = "PRICE_PRODUCT")
    private double price;

    @Column(name = "AMOUNT_PRODUCT")
    private int amount;

    @OneToMany(mappedBy = "idProduct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images = new ArrayList<>();
}