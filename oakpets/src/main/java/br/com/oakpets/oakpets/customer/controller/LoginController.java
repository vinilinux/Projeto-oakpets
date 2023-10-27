package br.com.oakpets.oakpets.customer.controller;

import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Customer customer, HttpSession session) {
        Customer storedCustomer = customerService.findCustomerByEmail(customer.getEmail());

        if (storedCustomer != null && passwordEncoder.matches(customer.getPassword(), storedCustomer.getPassword())) {
            session.setAttribute("currentUser", storedCustomer);

            // Construa um objeto JSON com as informações desejadas (ID do cliente e nome, por exemplo)
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("clientId", storedCustomer.getCustomerId());
            responseData.put("userName", storedCustomer.getName());

            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(HttpSession session) {
        Customer currentUser = (Customer) session.getAttribute("currentUser");

        if (currentUser != null) {
            currentUser = customerService.findByIdWithAddresses(Math.toIntExact(currentUser.getCustomerId()));

            return new ResponseEntity<>(currentUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}