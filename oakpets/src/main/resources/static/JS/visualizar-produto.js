document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get("id");

    function recuperarInformacoesDoCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        return carrinho;
    }

    function atualizarIconeCarrinho() {
        const carrinho = recuperarInformacoesDoCarrinho();
        const quantidadeItens = carrinho.length;
        const iconeCarrinho = document.getElementById("icone-carrinho");
        if (iconeCarrinho) {
            if (quantidadeItens > 0) {
                iconeCarrinho.innerHTML = `<i class="bi bi-cart4"></i><span class="badge badge-danger">${quantidadeItens}</span>`;
            } else {
                iconeCarrinho.innerHTML = `<i class="bi bi-cart4"></i>`;
            }
        }
    }
    atualizarIconeCarrinho();

    fetch(`/products/${produtoId}/details`)
        .then(response => response.json())
        .then(produto => {
            if (produto) {
                document.getElementById("product-name").textContent = produto.name;
                document.getElementById("product-description").textContent = produto.description;
                document.getElementById("product-price").textContent = `R$ ${produto.price.toFixed(2)}`;

                const quantidadeInput = document.getElementById("quantidade");
                quantidadeInput.value = 1;

                const botaoAdicionar = document.getElementById("botao");
                botaoAdicionar.addEventListener("click", function () {
                    const quantidade = parseInt(quantidadeInput.value);

                    // Calcule o total
                    const precoProduto = parseFloat(produto.price);
                    const total = quantidade * precoProduto;

                    const carrinho = recuperarInformacoesDoCarrinho();

                    const produtoExistenteIndex = carrinho.findIndex(item => item.produto.idProduct === produto.idProduct);

                    if (produtoExistenteIndex !== -1) {
                        // O produto já está no carrinho, então, em vez de adicionar, atualizamos a quantidade
                        carrinho[produtoExistenteIndex].quantidade += quantidade;
                        carrinho[produtoExistenteIndex].total += total;
                    } else {
                        // O produto não existe no carrinho, então adicionamos
                        carrinho.push({ produto, quantidade, total });
                    }

                    localStorage.setItem("carrinho", JSON.stringify(carrinho));

                    atualizarIconeCarrinho();

                    window.location.href = `pre-carrinho.html?total=${total}&productName=${produto.name}&productDescription=${produto.description}&productPrice=${produto.price}&productImage=${produto.images[0].imagePath}`;
                });

            } else {
                console.error("Produto não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar detalhes do produto: " + error);
            console.log(error);
        });
});