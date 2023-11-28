// Função para obter parâmetros da URL
function obterParametroDaURL(nome) {
    nome = nome.replace(/[[]/, "\\[").replace(/[]]/, "\\]");
    var regex = new RegExp("[?&]" + nome + "=([^&#]*)");
    var resultados = regex.exec(location.search);
    return resultados === null ? "" : decodeURIComponent(resultados[1].replace(/\+/g, " "));
}

// Obter o número do pedido da URL
var numeroDoPedido = obterParametroDaURL("pedido");
var getElement = document.getElementById("numeroPedido");
getElement.textContent = 'Número do Pedido: ' + numeroDoPedido;

console.log('Este e o numero do pedido' + numeroDoPedido);


const url = `http://localhost:8080/pedidos/detalhePedido/${numeroDoPedido}`;

// Realiza a requisição GET usando o Axios
axios.get(url)
    .then(response => {
        // Acessa os diferentes campos da resposta
        const pedido = response.data;

        var enderecoPedido = pedido.address;
        var enderecoElement = document.getElementById('endereco');
        var enderecoString = `${enderecoPedido.street}, ${enderecoPedido.number}, ${enderecoPedido.complement}, ${enderecoPedido.neighborhood}, ${enderecoPedido.city}, ${enderecoPedido.state}, ${enderecoPedido.zipCode}`;
        enderecoElement.textContent = enderecoString;

        var carrinho = pedido.itempedidos;

        if (carrinho && carrinho.length > 0) {
            var listaProdutos = document.getElementById('listaProdutos');

            carrinho.forEach(function (produto) {
                var nomeProduto = produto.product.name; // Certifique-se de que a propriedade esteja correta
                var quantidadeProduto = produto.quantidade;
                var valorProduto = produto.valor; // Certifique-se de que a propriedade esteja correta
                var listItem = document.createElement('li');
                listItem.textContent = `${nomeProduto} (Quantidade: ${quantidadeProduto}, Valor: R$ ${valorProduto})`;
                listaProdutos.appendChild(listItem);
            });
        } else {
            console.log('O carrinho está vazio ou não encontrado.');
        }

        var pagamento = pedido.tipoPagamento;
        var pagamentoElement = document.getElementById('forma-pagamento');
        pagamentoElement.textContent = pagamento;


        var freteValor = pedido.valorFrete;
        var freteValorPedido = document.getElementById('freteValor')
        freteValorPedido.textContent = freteValor;

        var valorTotal = pedido.valorTotal;
        var valorTotalPedido = document.getElementById('valorTotal');
        valorTotalPedido.textContent = 'R$ ' + valorTotal;

    })
    .catch(error => {
        // Trata erros, se houver algum
        console.error('Erro ao obter detalhes do pedido:', error);
    });

