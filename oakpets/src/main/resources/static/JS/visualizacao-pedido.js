$(document).ready(function () {

var opcaoPagamento = sessionStorage.getItem('tipoPagamento');
var formaPagamento = document.getElementById('forma-pagamento');
formaPagamento.textContent = opcaoPagamento;

var pedidoCompleto = localStorage.getItem('pedido');
var userName = localStorage.getItem('userName');
var tipoFrete = localStorage.getItem('selectedFrete')
var freteValor = localStorage.getItem('selectedFreteValue');
var carrinho = localStorage.getItem('carrinho')

if (pedidoCompleto) {
    var visualizacaoPedido = JSON.parse(pedidoCompleto);

    //Tratando o endereço
    var endereco = visualizacaoPedido.endereco;
    var enderecoPedido = document.getElementById('endereco');
    enderecoPedido.textContent = endereco;

    //Tratando dados pessoais
    var dadosPessoaisPedido = document.getElementById('dadosPessoais');
    dadosPessoaisPedido.textContent = userName;

    //Tratando o tipo do frete
    var tipoFretePedido = document.getElementById('tipoFrete')
    tipoFretePedido.textContent = tipoFrete;

    //Tratando o valor do frete
    var freteValorPedido = document.getElementById('freteValor');
    freteValorPedido.textContent = freteValor;

    //Tratando o valor total
    var valorTotal = visualizacaoPedido.totalValue;
    var valorTotalPedido = document.getElementById('valorTotal');
    valorTotalPedido.textContent = 'R$ ' + valorTotal;

}else{
    console.log('Item "Pedido" não encontrado')
}

if (carrinho) {

    var produtosCarrinho = JSON.parse(carrinho);

    if (produtosCarrinho.length > 0) {
        var listaProdutos = document.getElementById('listaProdutos');

        produtosCarrinho.forEach(function (produto) {
            var nomeProduto = produto.produto.name;
            var quantidadeProduto = produto.quantidade;
            var valorProduto = produto.total;
            var listItem = document.createElement('li');
            listItem.textContent = nomeProduto + ' (Quantidade: ' + quantidadeProduto + ', Valor: R$ ' + valorProduto + ')';
            listaProdutos.appendChild(listItem);
        });
    } else {
        console.log('O carrinho está vazio.');
    }
} else {
    console.log('Item "carrinho" não encontrado');
}

//Enviando para o backend

// Obtenha os dados do localStorage
    var pedidoCompleto = localStorage.getItem('pedido');
    var userName = localStorage.getItem('userName');
    var tipoFrete = localStorage.getItem('selectedFrete');
    var freteValor = parseFloat(localStorage.getItem('selectedFreteValue'));
    var carrinho = localStorage.getItem('carrinho');

// Adicione um ouvinte de evento de clique ao botão
    var enviarPedidoButton = document.getElementById('enviarPedido');
    enviarPedidoButton.addEventListener('click', function () {
        // Obtenha os dados do localStorage e envie-os para o backend
        if (pedidoCompleto && userName && tipoFrete && !isNaN(freteValor) && carrinho) {
            var visualizacaoPedido = JSON.parse(pedidoCompleto);

            var dadosParaEnviar = {
                customerId: visualizacaoPedido.clientId,
                address: visualizacaoPedido.endereco,
                valorTotal: visualizacaoPedido.totalValue,
                valorFrete: freteValor,
                tipoPagamento: tipoFrete,
                data: new Date().toLocaleDateString(),
                itemPedidoDTOS: carrinho.map(function (produto) {
                    return {
                        productId: produto.produto.idProduct,
                        quantidade: produto.quantidade,
                        valor: produto.total
                    };
                })
            };

            axios.post('URL_do_seu_endpoint', dadosParaEnviar)
                .then(function (response) {
                    console.log('Dados enviados com sucesso.');
                })
                .catch(function (error) {
                    console.error('Erro ao enviar os dados:', error);
                });
        } else {
            console.log('Dados incompletos no localStorage');
        }
    });
});