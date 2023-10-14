package br.com.oakpets.oakpets.customer.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long idAddress;
    @Column(name = "ADDRES_KIND")
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
    @ManyToOne
    @JoinColumn(name = "ID_Customer")
    private Customer idCustomer;

}
