package br.com.oakpets.oakpets.customer.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_address")
    private Integer id;

    @Column(name = "ADDRESS_KIND")
    private String addressKind;

    @Column(name = "STREET")
    private String street;

    @Column(name = "NUMBER")
    private String number;

    @Column(name = "COMPLEMENT")
    private String complement;

    @Column(name = "NEIGHBORHOOD")
    private String neighborhood;

    @Column(name = "CITY")
    private String city;

    @Column(name = "STATE")
    private String state;

    @Column(name = "ZIP_CODE")
    private String zipCode;

    @Column(name = "ENABLED")
    private Boolean enabled;

    @Column(name = "ADDRESS_DEFAULT")
    private Boolean addressDefault;

    @ManyToOne
    @JoinColumn(name = "ID_Customer")
    @JsonIgnore
    private Customer idCustomer;

}
