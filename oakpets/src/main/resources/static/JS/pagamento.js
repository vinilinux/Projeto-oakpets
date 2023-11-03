$(document).ready(function () {
    // Inicialmente, ocultar os detalhes do cartão
    $(".credit-card-details").hide();

    // Verifique a sessionStorage para a opção selecionada
    const selectedOption = sessionStorage.getItem('selectedOption');
    if (selectedOption === 'boleto') {
        // Se "Boleto" foi selecionado anteriormente, oculte os detalhes do cartão
        $("#cartao-option").prop("checked", false);
        $(".credit-card-details").hide();
    } else if (selectedOption === 'cartao') {
        // Se "Cartão" foi selecionado anteriormente, marque a opção e mostre os detalhes
        $("#cartao-option").prop("checked", true);
        $(".credit-card-details").show();
    }

    // Quando o usuário clica na opção "Cartão", mostrar os detalhes do cartão
    $("#cartao-option").change(function () {
        $(".credit-card-details").show();
        // Armazene a opção selecionada na sessionStorage
        sessionStorage.setItem('tipoPagamento', 'cartao');
    });

    // Quando o usuário clica na opção "Boleto", ocultar os detalhes do cartão
    $("#boleto-option").change(function () {
        $(".credit-card-details").hide();
        // Armazene a opção selecionada na sessionStorage
        sessionStorage.setItem('tipoPagamento', 'boleto');
    });
});