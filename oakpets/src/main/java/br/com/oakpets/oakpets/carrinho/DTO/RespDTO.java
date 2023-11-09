package br.com.oakpets.oakpets.carrinho.DTO;

import java.util.Date;

public record RespDTO(Long id, Date data, String status, double valorTotal) {
}
