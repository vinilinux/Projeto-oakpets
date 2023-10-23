document.addEventListener("DOMContentLoaded", function () {
    function obterClienteIdDaURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

    const clienteId = obterClienteIdDaURL();

    if (clienteId) {
        carregarEnderecos(clienteId);
    } else {
        console.error("ID do cliente não encontrado na URL.");
    }

    function carregarEnderecos(clienteId) {
        fetch(`/customers/${clienteId}`)
            .then((response) => response.json())
            .then((data) => {

                if (data.addresses && data.addresses.length > 0) {
                    const enderecoContainer = document.getElementById("endereco-container");

                    enderecoContainer.innerHTML = "";

                    data.addresses.forEach(address => {
                        const divEndereco = document.createElement("div");
                        divEndereco.classList.add("container", "d-flex", "align-items-center", "justify-content-between", "mb-3", "enderecos");

                        const imgEndereco = document.createElement("img");
                        imgEndereco.src = address.addressKind === "Faturamento" ? "/Images/faturamento.png" : "/Images/entrega.png";

                        const enderecoInfo = document.createElement("div");
                        enderecoInfo.classList.add("text-left", "endereco-container");
                        enderecoInfo.innerHTML = `
                        <h5>${address.addressKind}</h5>
                        <p>${address.street}, ${address.number}</p>
                        <p>${address.neighborhood} - ${address.city} | ${address.state}</p>
                        <p>${address.zipCode}</p>
                        <a href="#" class="editar">Editar</a>
                    `;

                        const imgLixeira = document.createElement("a");
                        imgLixeira.href = "#";
                        imgLixeira.innerHTML = '<img src="/Images/lixeira.png" alt="Excluir Endereço">';
                        imgLixeira.classList.add("cursor-pointer");
                        imgLixeira.addEventListener("click", function (event) {
                            event.preventDefault();
                            const enderecoId = address.id;
                            desativarEndereco(enderecoId);
                        });

                        divEndereco.appendChild(imgEndereco);
                        divEndereco.appendChild(enderecoInfo);
                        divEndereco.appendChild(imgLixeira);

                        enderecoContainer.appendChild(divEndereco);
                    });
                } else {
                    console.error("O cliente não possui endereços.");
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar os endereços do cliente:", error);
            });
    }

    function desativarEndereco(enderecoId) {
        fetch(`/customers/address/${enderecoId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.status === 204) {
                    console.log(`Endereço ${enderecoId} desativado com sucesso.`);
                } else {
                    console.error(`Falha ao desativar o endereço ${enderecoId}.`);
                }
            })
            .catch(error => {
                console.error(`Erro ao desativar o endereço ${enderecoId}:`, error);
            });
    }
});

// Função para obter o ID do cliente da URL
function obterClienteIdDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Botão "Adicionar Endereço"
const adicionarEnderecoButton = document.getElementById("adicionarEnderecoButton");

// Adicione um ouvinte de evento de clique ao botão
adicionarEnderecoButton.addEventListener("click", function() {
    // Obtenha o ID do cliente da URL
    const clienteId = obterClienteIdDaURL();

    if (clienteId) {
        // Redirecione para a página "formularioEnderecoCliente.html" com o ID do cliente na URL
        window.location.href = `/formularioEnderecoCliente.html?id=${clienteId}`;
    } else {
        console.error("ID do cliente não encontrado na URL.");
    }
});
