$(document).ready(function () {

var opcaoPagamento = sessionStorage.getItem('tipoPagamento');
var formaPagamento = document.getElementById('forma-pagamento');
formaPagamento.textContent = opcaoPagamento;

var pedidoCompleto = localStorage.getItem('pedido');
var userName = localStorage.getItem('userName');
var tipoFrete = localStorage.getItem('selectedFrete')
var freteValor = localStorage.getItem('selectedFreteValue');
var carrinho = localStorage.getItem('carrinho');

if (pedidoCompleto) {
    var visualizacaoPedido = JSON.parse(pedidoCompleto);

    //Tratando o endereço
    var endereco = visualizacaoPedido.endereco;
    var enderecoPedido = document.getElementById('endereco');
    enderecoPedido.textContent = endereco;
    var idEndereco = endereco.match(/\d+/);

    // Verifique se o primeiro número foi encontrado e imprima-o
    if (idEndereco) {
        var idEnderecoString = idEndereco[0].toString();
        console.log('ID do endereço:', idEnderecoString);
        console.log(typeof idEnderecoString);
    } else {
        console.log('ID do endereço não encontrado');
    }

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

// Adicione um ouvinte de evento de clique ao botão

    var enviarPedidoButton = document.getElementById('enviarPedido');
    enviarPedidoButton.addEventListener('click', function () {
        if (pedidoCompleto && userName && opcaoPagamento && !isNaN(freteValor) && carrinho) {
            var visualizacaoPedido = JSON.parse(pedidoCompleto);

            var dadosParaEnviar = {
                customerId: visualizacaoPedido.clientId,
                valorTotal: visualizacaoPedido.totalValue,
                valorFrete: freteValor,
                tipoPagamento: opcaoPagamento,
                address: idEnderecoString,
                data: new Date().toLocaleDateString(),
                itemPedidoDTOS: produtosCarrinho.map(function (produto) {
                    return {
                        productId: produto.produto.idProduct,
                        quantidade: produto.quantidade,
                        valor: produto.total
                    };
                })
            };

            console.log(dadosParaEnviar);

            // Envie os dados para o backend
            axios.post('http://localhost:8080/pedidos', dadosParaEnviar)
                .then(function (response) {
                    console.log('Dados enviados com sucesso.');

                    // Exibir um alerta com as informações do pedido e se foi gravado no banco
                    var pedidoInfo = `Gravado com sucesso no banco de Dados!\n Número do Pedido: ${response.data.numeroDoPedido}\nValor do Pedido: R$ ${visualizacaoPedido.totalValue}`;
                    alert(pedidoInfo);

                    window.location.href = 'minha-conta.html';
                })
                .catch(function (error) {
                    console.error('Erro ao enviar os dados:', error);
                    // Exibir um alerta indicando que ocorreu um erro
                    alert('Erro ao enviar os dados: ' + error.message);
                });
        } else {
            console.log('Dados incompletos no localStorage');
            // Exibir um alerta indicando que os dados estão incompletos
            alert('Dados incompletos. Por favor, preencha todos os campos necessários.');
        }
    });
});