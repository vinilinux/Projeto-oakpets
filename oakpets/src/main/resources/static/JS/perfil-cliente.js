document.addEventListener("DOMContentLoaded", function() {

    fetch("/api/userinfo")
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                window.location.href = "/login-customer.html";
            }
        })
        .then(data => {
            const editarPerfilLink = document.getElementById("editarPerfil");
            editarPerfilLink.href = `/formulario-cliente.html?id=${data.id}`;
        })
        .catch(error => {
            console.error("Erro ao obter informações do cliente: " + error);
        });
});