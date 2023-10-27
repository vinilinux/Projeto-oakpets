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
        fetch(`/customers/address/${clienteId}`)
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
                        <a href="#" class="editar" data-address-id="${address.id}">Editar</a>
                    `;

                        const editarLink = enderecoInfo.querySelector(".editar");
                        editarLink.addEventListener("click", (event) => {
                            event.preventDefault();
                            const addressId = event.target.getAttribute("data-address-id");
                            window.location.href = `editar-endereco-cliente.html?id=${addressId}`;
                        });

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

    const adicionarEnderecoButton = document.getElementById("adicionarEnderecoButton");

    // Adicione um ouvinte de evento de clique ao botão
    adicionarEnderecoButton.addEventListener("click", function() {
        const clienteId = obterClienteIdDaURL();
        if (clienteId) {
            // Redirecione para a página "cadastro-endereco-cliente.html" com o ID do cliente na URL
            window.location.href = `/cadastro-endereco-cliente.html?id=${clienteId}`;
        } else {
            console.error("ID do cliente não encontrado na URL.");
        }
    });
});

function desativarEndereco(enderecoId) {
    fetch(`/address/delete/${enderecoId}`, {
        method: "DELETE"
    })

    .then(response => {
        if (response.status === 200) {
            // Remova o elemento da interface do usuário após a exclusão bem-sucedida
            const enderecoElement = document.querySelector(`[data-endereco-id="${enderecoId}"]`);
            if (enderecoElement) {
                enderecoElement.remove();
            }
            alert(`Endereço ${enderecoId} desativado com sucesso.`);
            // Recarregue a página após a exclusão bem-sucedida
            location.reload();
        } else {
            console.error(`Falha ao desativar o endereço ${enderecoId}.`);
            // Exibir um alerta de falha
            alert(`Falha ao desativar o endereço ${enderecoId}.`);
        }
    })
    .catch(error => {
        console.error(`Erro ao desativar o endereço ${enderecoId}:`, error);
        // Exibir um alerta de erro
        alert(`Erro ao desativar o endereço ${enderecoId}: ${error.message}`);
    });
}