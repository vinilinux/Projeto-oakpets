

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


async function fetchProducts() {
    try {
        console.log("Iniciando fetchProducts");
        const response = await fetch('/products/all');
        const products = await response.json();

        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        let currentRow;
        let productCount = 0;

        products.forEach((product, index) => {
            if (productCount % 3 === 0) {
                currentRow = document.createElement('div');
                currentRow.classList.add('row');
                productList.appendChild(currentRow);
            }

            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'col-md-4');

            const productImage = document.createElement('img');
            productImage.src = product.images[0].imagePath;
            productImage.alt = 'Imagem do Produto';
            productImage.classList.add('img-fluid');

            const productContent = document.createElement('div');
            productContent.classList.add('product-content');

            const productTitle = document.createElement('h2');
            productTitle.classList.add('product-title');
            productTitle.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.classList.add('product-price');
            productPrice.textContent = `R$ ${product.price.toFixed(2)}`;

            const detailsButton = document.createElement('a');
            detailsButton.classList.add('details-button', 'btn', 'btn-primary');
            detailsButton.href = `visualizar-produto.html?id=${product.idProduct}`;
            detailsButton.textContent = 'Detalhes';

            productContent.appendChild(productTitle);
            productContent.appendChild(productPrice);
            productContent.appendChild(detailsButton);

            productCard.appendChild(productImage);
            productCard.appendChild(productContent);

            currentRow.appendChild(productCard);

            productCount++;
        });

        // Atualiza o ícone do carrinho após a busca e renderização dos produtos
        atualizarIconeCarrinhoGlobal();

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
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
    updateUIBasedOnLoginStatus();
    fetchProducts();
    atualizarIconeCarrinhoGlobal();
});
