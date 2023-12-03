
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
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



$(document).ready(function () {
    // Inicialmente, ocultar os detalhes do cartão
    $(".credit-card-details").hide();

    // Desabilite o botão "Continuar" inicialmente
    const continuaButton = $(".continua");
    continuaButton.prop("disabled", true);


    $("#cartao-option").change(function () {
        $(".credit-card-details").show();
        continuaButton.prop("disabled", false);

        sessionStorage.setItem('tipoPagamento', 'cartao');
    });


    $("#boleto-option").change(function () {
        $(".credit-card-details").hide();
        continuaButton.prop("disabled", false);

        sessionStorage.setItem('tipoPagamento', 'boleto');
    });

});

document.addEventListener("DOMContentLoaded", function () {

    const localStorageData = localStorage.getItem('pedido');


    if (localStorageData !== null) {

        const pedido = JSON.parse(localStorageData);


        const totalValue = pedido.totalValue;
        const freteValue = pedido.freteValue;



        document.getElementById('totalValue').textContent = totalValue;
        document.getElementById('freteValue').textContent = freteValue;

    } else {

        console.log('Dados não encontrados no localStorage.');
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const continuarButton = document.getElementById("continuar-button");


    const voltarButton = document.getElementById("voltar-button");


    continuarButton.addEventListener("click", function () {

        window.location.href = "visualizacao-pedido.html";

    });


    voltarButton.addEventListener("click", function () {

        window.location.href = "carrinho.html";

    });
});

