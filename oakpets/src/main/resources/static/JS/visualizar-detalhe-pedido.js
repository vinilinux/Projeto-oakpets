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
getElement.textContent = 'Detalhes do pedido #' + numeroDoPedido;

console.log('Este e o numero do pedido' + numeroDoPedido);


const url = `http://localhost:8080/pedidos/detalhePedido/${numeroDoPedido}`;

// Realiza a requisição GET usando o Axios
axios.get(url)
    .then(response => {
        // Acessa os diferentes campos da resposta
        const pedido = response.data;

        var enderecoPedido = pedido.address;
        var logradouroElement = document.getElementById('logradouro');
        var complementoElement = document.getElementById('complemento');
        var bairroElement = document.getElementById('bairro');
        var cidadeElement = document.getElementById('cidade');
        var cepElement = document.getElementById('cep');
        var logradouroString = `${enderecoPedido.street}, ${enderecoPedido.number}`;
        var complementoString = `${enderecoPedido.complement}`;
        var bairroString = `${enderecoPedido.neighborhood}`;
        var cidadeString = `${enderecoPedido.city}, ${enderecoPedido.state}`;
        var cepString = `${enderecoPedido.zipCode}`;
        cepElement.textContent = cepString;
        cidadeElement.textContent = cidadeString;
        bairroElement.textContent = bairroString;
        complementoElement.textContent = complementoString;``
        logradouroElement.textContent = logradouroString;

        var carrinho = pedido.itempedidos;

        if (carrinho && carrinho.length > 0) {
            var listaProdutos = document.getElementById('listaProdutos');
            var listaProdutosQuant = document.getElementById('ListaProdutosQuant');
            var listaProdutosValor = document.getElementById('ListaProdutosValor');

            carrinho.forEach(function (produto) {
                var nomeProduto = produto.product.name; // Certifique-se de que a propriedade esteja correta
                var quantidadeProduto = produto.quantidade;
                var valorProduto = produto.valor; // Certifique-se de que a propriedade esteja correta
                var listItem = document.createElement('li');
                var listItemQuant = document.createElement('li');
                var listItemValor = document.createElement('li')
                listItemValor.textContent = `R$ ${valorProduto}`;
                listaProdutosValor.appendChild(listItemValor);
                listItemQuant.textContent = `${quantidadeProduto}`;
                listaProdutosQuant.appendChild(listItemQuant)
                listItem.textContent = `${nomeProduto}`;
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
        freteValorPedido.textContent = 'R$ ' + freteValor;

        var valorTotal = pedido.valorTotal;
        var valorTotalPedido = document.getElementById('valorTotal');
        valorTotalPedido.textContent = 'R$ ' + valorTotal;

        var statusPedido = pedido.status;
        var elemStatus = document.getElementById('status');
        elemStatus.textContent = 'Status: ' + statusPedido;

    })
    .catch(error => {
        // Trata erros, se houver algum
        console.error('Erro ao obter detalhes do pedido:', error);
    });

