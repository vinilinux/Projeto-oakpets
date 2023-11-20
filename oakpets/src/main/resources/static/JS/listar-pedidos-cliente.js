
//-------------------------------- Lista -------------------------------- //


function carregarPedidos() {

    fetch('/pedidos/todos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar pedidos');
            }
            return response.json();
        })
        .then(data => {
            var tbody = document.getElementById('products').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            data.forEach(function (pedido) {
                var row = '<tr>' +
                    '<td>' + pedido.numeroPedido + '</td>' +
                    '<td>' + formatarData(pedido.dataPedido) + '</td>' +
                    '<td>' + formatarMoeda(pedido.valorTotal) + '</td>' +
                    '<td>' + pedido.status + '</td>' +
                    '<td><button class="btn btn-primary" data-id="' + pedido.numeroPedido + '" onclick="abrirPopup(this)">Editar</button></td>' +
                    '</tr>';

                tbody.innerHTML += row;
            });


        })
        .catch(error => {
            console.error('Erro ao carregar pedidos:', error);
        });
}


function formatarData(dataString) {
    var data = new Date(dataString);
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();


    var dataFormatada = dia + '/' + mes + '/' + ano
    return dataFormatada;
}


function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}





//-------------------------------- Lista -------------------------------- //

//-------------------------------- Pop-up -------------------------------- //

function obterDetalhesPedidoPorId(pedidoId) {
    console.log('Obtendo detalhes do pedido para o ID:', pedidoId);

    fetch('/pedidos/obteridpedido/' + pedidoId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter detalhes do pedido');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados do pedido obtidos:', data);
            document.getElementById("statusSelect").value = data.status;
        })
        .catch(error => {
            console.error('Erro ao obter detalhes do pedido:', error);
        });
}


function abrirPopup(botaoEditar) {
    var popup = document.getElementById("popup");
    var pedidoId = botaoEditar.getAttribute("data-id");


    document.getElementById("btnEnviar").setAttribute("data-pedido-id", pedidoId);

    obterDetalhesPedidoPorId(pedidoId);

    popup.style.display = "block";
}




function enviarDadosParaServidor() {
    var pedidoId = document.getElementById("btnEnviar").getAttribute("data-pedido-id");

    var novoStatus = document.getElementById("statusSelect").value;

    if (pedidoId) {

        fetch('/pedidos/' + pedidoId + '/status', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                novoStatus: novoStatus,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error('Erro ao atualizar status');
                }

                if (response.headers.get('content-type')?.includes('application/json')) {
                    return response.json();
                } else {

                    return response.text();
                }
            })
            .then(data => {

                if (typeof data === 'string' && data.startsWith('{')) {
                    data = JSON.parse(data);
                }

                console.log('Status atualizado com sucesso:', data);


                fecharPopup();


                carregarPedidos();
            })
            .catch(error => {
                console.error('Erro ao atualizar status:', error);
            });
    } else {
        alert("ID do pedido não encontrado.");
    }
}

function fecharPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

//-------------------------------- Pop-up -------------------------------- //



document.addEventListener('DOMContentLoaded', function () {
    carregarPedidos();
    document.getElementById("btnBuscar").addEventListener("click", filtrarPedidos);

    function filtrarPedidos() {
        var codigoPedido = document.getElementById("search").value;

        if (codigoPedido.trim() === "") {
            // Se o campo de input estiver vazio, carregar a lista completa
            carregarPedidos();
        } else {
            // Se o campo de input contiver um código, filtrar os pedidos
            if (!Number.isInteger(Number(codigoPedido))) {
                alert("Por favor, digite um código de pedido válido.");
                return;
            }
            carregarPedidosPorCodigo(codigoPedido);
        }
    }

    function carregarPedidos() {
        fetch('/pedidos/todos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar pedidos');
                }
                return response.json();
            })
            .then(data => {
                var tbody = document.getElementById('products').getElementsByTagName('tbody')[0];
                tbody.innerHTML = '';

                data.forEach(function (pedido) {
                    var row = '<tr>' +
                        '<td>' + pedido.numeroPedido + '</td>' +
                        '<td>' + formatarData(pedido.dataPedido) + '</td>' +
                        '<td>' + formatarMoeda(pedido.valorTotal) + '</td>' +
                        '<td>' + pedido.status + '</td>' +
                        '<td><button class="btn btn-primary" data-id="' + pedido.numeroPedido + '" onclick="abrirPopup(this)">Editar</button></td>' +
                        '</tr>';

                    tbody.innerHTML += row;
                });
            })
            .catch(error => {
                console.error('Erro ao carregar pedidos:', error);
            });
    }

    function carregarPedidosPorCodigo(codigoPedido) {
        var apiUrl = '/pedidos/obteridpedido/' + codigoPedido;

        console.log('Chamando API:', apiUrl);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar pedido por código');
                }
                return response.json();
            })
            .then(pedido => {
                var tbody = document.getElementById('products').getElementsByTagName('tbody')[0];
                tbody.innerHTML = '';

                if (pedido) {
                    var row = '<tr>' +
                        '<td>' + pedido.numeroDoPedido + '</td>' +
                        '<td>' + formatarData(pedido.dataPedido) + '</td>' +
                        '<td>' + formatarMoeda(pedido.valorTotal) + '</td>' +
                        '<td>' + pedido.status + '</td>' +
                        '<td><button class="btn btn-primary" data-id="' + pedido.numeroDoPedido + '" onclick="abrirPopup(this)">Editar</button></td>' +
                        '</tr>';

                    tbody.innerHTML += row;
                } else {
                    alert("Nenhum pedido encontrado com o código fornecido.");
                }
            })
            .catch(error => {
                console.error('Erro ao carregar pedido por código:', error);
            });
    }
});
