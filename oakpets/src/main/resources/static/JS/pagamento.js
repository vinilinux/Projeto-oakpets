$(document).ready(function () {
    // Inicialmente, ocultar os detalhes do cartão
    $(".credit-card-details").hide();

    // Desabilite o botão "Continuar" inicialmente
    const continuaButton = $(".continua");
    continuaButton.prop("disabled", true);

    // Quando o usuário clica na opção "Cartão", mostrar os detalhes do cartão e habilitar o botão
    $("#cartao-option").change(function () {
        $(".credit-card-details").show();
        continuaButton.prop("disabled", false);
        // Armazene a opção selecionada na sessionStorage
        sessionStorage.setItem('tipoPagamento', 'cartao');
    });

    // Quando o usuário clica na opção "Boleto", ocultar os detalhes do cartão e desabilitar o botão
    $("#boleto-option").change(function () {
        $(".credit-card-details").hide();
        continuaButton.prop("disabled", false);
        // Armazene a opção selecionada na sessionStorage
        sessionStorage.setItem('tipoPagamento', 'boleto');
    });

});

document.addEventListener("DOMContentLoaded", function () {
    // Recupere o JSON do localStorage
    const localStorageData = localStorage.getItem('pedido');

    // Verifique se os dados não são nulos
    if (localStorageData !== null) {
        // Analise o JSON de volta para um objeto JavaScript
        const pedido = JSON.parse(localStorageData);

        // Agora você pode acessar os valores no objeto
        const totalValue = pedido.totalValue;
        const freteValue = pedido.freteValue;


        // Faça o que quiser com esses valores, por exemplo, exibi-los nos campos HTML
        document.getElementById('totalValue').textContent = totalValue;
        document.getElementById('freteValue').textContent = freteValue;

    } else {
        // Caso os dados não sejam encontrados no localStorage, você pode lidar com isso de acordo com a lógica do seu aplicativo
        console.log('Dados não encontrados no localStorage.');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Seletor para o botão "Continuar"
    const continuarButton = document.getElementById("continuar-button");

    // Seletor para o botão "Voltar"
    const voltarButton = document.getElementById("voltar-button");

    // Adicione um manipulador de eventos para o botão "Continuar"
    continuarButton.addEventListener("click", function () {
        // Redirecione o usuário para a página desejada
        window.location.href = "visualizacao-pedido.html"; // Substitua "URL_DA_PAGINA_CONTINUAR" pela URL da página
        // para a qual você
        // deseja redirecionar.
    });

    // Adicione um manipulador de eventos para o botão "Voltar"
    voltarButton.addEventListener("click", function () {
        // Redirecione o usuário para a página desejada
        window.location.href = "carrinho.html"; // Substitua "URL_DA_PAGINA_VOLTAR" pela URL da página para a qual você
        // deseja redirecionar.
    });
});

