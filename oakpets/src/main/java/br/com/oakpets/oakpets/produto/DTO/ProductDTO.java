package br.com.oakpets.oakpets.produto.DTO;
public record ProductDTO(long idProduct,String name, double rate, String description, double price, int amount,
                         String status) {
}
