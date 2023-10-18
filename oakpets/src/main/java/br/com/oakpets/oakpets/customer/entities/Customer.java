package br.com.oakpets.oakpets.customer.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_client")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Customer")
    private long id_customer;

    @Column(name = "NAME")
    private String name;

    @Column(name = "BIRTH_DATE")
    private LocalDate bDay;

    @Column(name = "CPF")
    private String cpf;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "GENDER")
    private String gender;

    @OneToMany(mappedBy = "idCustomer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Address> addresses = new ArrayList<>();
}
