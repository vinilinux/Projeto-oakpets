package br.com.oakpets.oakpets.entities;

public enum UserRole {
    ADMIN("admin"),
    ESTOQUE("estoque");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
