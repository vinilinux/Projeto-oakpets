document.addEventListener("DOMContentLoaded", function() {

    fetch("/api/userinfo")
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            window.location.href = "/login-cliente.html";
        }
    })
    .then(data => {
        const editarPerfilLink = document.getElementById("editarPerfil");
        editarPerfilLink.href = `/editar-cliente.html?id=${data.customerId}`;

        const listarEnderecos = document.getElementById("listarEnderecos");
        listarEnderecos.href = `/enderecos.html?id=${data.customerId}`;

        const listarPedidos = document.getElementById("listarPedidos");
        listarPedidos.href = `/meus-pedidos.html?id=${data.customerId}`;
    })
    .catch(error => {
        console.error("Erro ao obter informações do cliente: " + error);
    });
});