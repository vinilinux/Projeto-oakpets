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






const urlParams = new URLSearchParams(window.location.search);
const clientId = urlParams.get('id');

function formatarDataBrasileira(data) {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Lembre-se de adicionar 1, já que os meses são base 0
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

if (!clientId) {
    console.log('Cliente não encontrado na URL.');
} else {
    const endpoint = `/pedidos/${clientId}`;
    const meusPedidosRow = document.getElementById('meus-pedidos');

    function carregarPedidos() {
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar pedidos.');
                }
                return response.json();
            })
            .then(data => {
                // Ordenar os pedidos em forma decrescente com base no ID
                data.sort((a, b) => b.id - a.id);

                // Limpe o conteúdo anterior (se houver)
                meusPedidosRow.innerHTML = '';

                data.forEach(pedido => {
                    const pedidoDiv = document.createElement('div');
                    pedidoDiv.className = 'col-12 mb-4'; // Define o tamanho da coluna
                    pedidoDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="row justify-content-center">
                            <div class="col-2">
                                <p class="titlesCard">Número do Pedido:</p>
                                <p class="contentCard">${pedido.id}</p>
                            </div>
                            <div class="col-2">
                                <p class="titlesCard" >Data:</p>
                                <p class="contentCard">${formatarDataBrasileira(pedido.data)}</p>  
                            </div>
                            <div class="col-2">
                                <p class="titlesCard">Valor:</p>
                                <p class="contentCard">R$ ${pedido.valorTotal}</p>
                            </div>
                            <div class="col-2">
                                <p class="titlesCard">Status:</p>
                                <p class="contentCard">${pedido.status}</p>
                            </div>
                            <div class="col-2">
                                <a href="visualizar-detalhe-pedido.html?pedido=${pedido.id}"><button class="btn btn-primary" ">Mais Detalhes</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

                    meusPedidosRow.appendChild(pedidoDiv);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Chame a função carregarPedidos imediatamente
    carregarPedidos();

}
