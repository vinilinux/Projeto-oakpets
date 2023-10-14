package br.com.oakpets.oakpets.customer.controller;



import br.com.oakpets.oakpets.customer.entities.Customer;
import br.com.oakpets.oakpets.customer.services.CustomerService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Customer customer, HttpSession session) {
        Customer authenticatedUser = customerService.authenticate(customer.getEmail(), customer.getPassword());
        if (authenticatedUser != null) {
            session.setAttribute("currentUser", authenticatedUser);

            return new ResponseEntity<>(authenticatedUser.getName(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo() {

        Customer currentUser = new Customer();
        currentUser.setName("Nome do Usuário");

        return new ResponseEntity<>(currentUser.getName(), HttpStatus.OK);
    }


    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
