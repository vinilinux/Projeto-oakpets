package br.com.oakpets.oakpets.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_product_image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_IMAGE")
    private String idImage;

    @Column(name = "IMAGE_PRODUCT_PATH")
    private String imagePath;

    @Column(name = "IMAGE_DEFAULT")
    private String imageDefault;

    @ManyToOne
    @JoinColumn(name = "ID_PRODUCT")
    @JsonIgnore
    private Product idProduct;
}
