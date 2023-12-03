
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const total = urlParams.get("total");
    const productName = urlParams.get("productName");
    const productDescription = urlParams.get("productDescription");
    const productPrice = urlParams.get("productPrice");
    const productImage = urlParams.get("productImage");


    const produtoId = urlParams.get("id");

    function recuperarInformacoesDoCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        return carrinho;
    }

    function atualizarIconeCarrinho() {
        const carrinho = recuperarInformacoesDoCarrinho();
        const quantidadeItens = carrinho.length;
        const contadorCarrinho = document.getElementById("contador-carrinho");

        console.log("Iniciando atualizarIconeCarrinhoGlobal");

        if (contadorCarrinho) {
            contadorCarrinho.textContent = quantidadeItens;
            contadorCarrinho.style.display = quantidadeItens > 0 ? 'inline' : 'none';
        }

        console.log("AtualizarIconeCarrinhoGlobal concluído com sucesso");
    }

    atualizarIconeCarrinho();

});

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