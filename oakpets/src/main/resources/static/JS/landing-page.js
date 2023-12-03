

function recuperarInformacoesDoCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    return carrinho;
}

// Função para recuperar um item específico do carrinho com base no ID do produto
function recuperarItemDoCarrinhoPorId(produtoId) {
    const carrinho = recuperarInformacoesDoCarrinho();
    const itemEncontrado = carrinho.find(item => item.produto.idProduct === produtoId);
    return itemEncontrado || null;
}

function atualizarIconeCarrinhoGlobal() {
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

function updateUIBasedOnLoginStatus() {
    const userName = localStorage.getItem("userName");
    const userStatusElement = document.getElementById('userStatus');
    const logoutLink = document.getElementById('logoutLink');

    console.log("Valor de userName em localStorage:", localStorage.getItem("userName"));

    if (userName) {
        userStatusElement.classList.add('btnEntrar');
        userStatusElement.innerHTML = `<i class="bi bi-person-fill"></i> <a href="minha-conta.html">${userName}</a>`;
        logoutLink.style.display = 'inline';
    } else {
        userStatusElement.classList.remove('btnEntrar');
        userStatusElement.innerHTML = `<a href="./login-cliente.html"><button class="btn btnEntrar text-left" type="submit"><i class="bi bi-person-fill"></i> <span>Entre ou <br> Cadastre-se</span></button></a>`;
        logoutLink.style.display = 'none';
    }
}




document.addEventListener("DOMContentLoaded", function () {
    atualizarIconeCarrinhoGlobal();
    updateUIBasedOnLoginStatus();
});
