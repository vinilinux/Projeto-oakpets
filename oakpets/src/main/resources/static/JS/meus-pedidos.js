// Obtenha o clientId a partir da URL
const urlParams = new URLSearchParams(window.location.search);
const clientId = urlParams.get('id');

if (!clientId) {
    console.log('Cliente não encontrado na URL.');
} else {
    // Substitua 'SEU_ENDPOINT' pelo URL real do seu endpoint
    const endpoint = `/pedidos/${clientId}`;
    const meusPedidosRow = document.getElementById('meus-pedidos');

    // Função para carregar os pedidos
    function carregarPedidos() {
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar pedidos.');
                }
                return response.json();
            })
            .then(data => {
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
                                        <p>Número do Pedido:</p>
                                        <p>${pedido.id}</p>
                                    </div>
                                    <div class="col-2">
                                        <p>Data:</p>
                                        <p>${pedido.data}</p>
                                    </div>
                                    <div class="col-2">
                                        <p>Valor:</p>
                                        <p>R$ ${pedido.valorTotal}</p>
                                    </div>
                                    <div class="col-2">
                                        <p>Status:</p>
                                        <p>${pedido.status}</p>
                                    </div>
                                    <div class="col-2">
                                        <button class="btn btn-primary">Mais Detalhes</button>    
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
