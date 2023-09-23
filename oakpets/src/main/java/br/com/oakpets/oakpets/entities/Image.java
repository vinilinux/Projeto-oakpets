package br.com.oakpets.oakpets.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "TBL_PRODUCT_IMAGE")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IMAGE_ID")
    private String id_image;

    @Column(name = "IMAGE_PRODUCT_PATH")
    private String image_path;

    @Column(name = "IMAGE_DEFAULT")
    private String image_default;

    @ManyToOne
    @JoinColumn(name = "ID_PRODUCT")
    @JsonIgnore
    private Product id_product;
}
