package br.com.oakpets.oakpets.produto.DTO;

import org.springframework.web.multipart.MultipartFile;

public record ProductDTO(String name, String rate, String description, String price, String amount) {
}
