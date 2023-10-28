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
                        `;

                        if (address.addressKind === "Faturamento") {
                            const editarLink = document.createElement("a");
                            editarLink.href = "#";
                            editarLink.classList.add("editar");
                            editarLink.setAttribute("data-address-id", address.id);
                            editarLink.textContent = "Editar";
                            editarLink.addEventListener("click", (event) => {
                                event.preventDefault();
                                const addressId = event.target.getAttribute("data-address-id");
                                window.location.href = `editar-endereco-cliente.html?id=${addressId}`;
                            });
                            enderecoInfo.appendChild(editarLink);
                        }

                        const imgLixeira = document.createElement("a");
                        imgLixeira.href = "#";
                        imgLixeira.innerHTML = '<img src="/Images/lixeira.png" alt="Excluir Endereço">';
                        imgLixeira.classList.add("cursor-pointer");
                        imgLixeira.addEventListener("click", function (event) {
                            event.preventDefault();
                            const enderecoId = address.id;
                            desativarEndereco(enderecoId);
                        });

                        if (address.addressKind === "Entrega") {
                            const checkbox = document.createElement("input");
                            checkbox.type = "checkbox";
                            checkbox.name = "enderecoPadrao";
                            checkbox.value = address.id;
                            checkbox.checked = address.addressDefault;

                            checkbox.addEventListener("change", () => {
                                if (checkbox.checked) {
                                    const checkboxes = document.querySelectorAll('input[name="enderecoPadrao"]');
                                    checkboxes.forEach(cb => {
                                        if (cb !== checkbox) {
                                            cb.checked = false;
                                            atualizarEnderecoPadrao(cb.value, false);
                                        }
                                    });

                                    atualizarEnderecoPadrao(checkbox.value, true);
                                } else {
                                    atualizarEnderecoPadrao(checkbox.value, false);
                                }
                            });

                            const checkboxLabel = document.createElement("label");
                            checkboxLabel.appendChild(checkbox);
                            checkboxLabel.appendChild(document.createTextNode("Endereço Padrão"));

                            enderecoInfo.appendChild(checkboxLabel);
                        }

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

    adicionarEnderecoButton.addEventListener("click", function () {
        const clienteId = obterClienteIdDaURL();
        if (clienteId) {
            window.location.href = `/cadastro-endereco-cliente.html?id=${clienteId}`;
        } else {
            console.error("ID do cliente não encontrado na URL.");
        }
    });

    function atualizarEnderecoPadrao(enderecoId, novoValor) {
        fetch(`/address/updateAddressDefault/${enderecoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(novoValor),
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Endereço padrão atualizado com sucesso.");
                } else {
                    console.error(`Falha ao atualizar o endereço padrão.`);
                    alert(`Falha ao atualizar o endereço padrão.`);
                }
            })
            .catch((error) => {
                console.error(`Erro ao atualizar o endereço padrão:`, error);
                alert(`Erro ao atualizar o endereço padrão: ${error.message}`);
            });
    }

    function desativarEndereco(enderecoId) {
        fetch(`/address/delete/${enderecoId}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.status === 200) {
                    const enderecoElement = document.querySelector(`[data-endereco-id="${enderecoId}"]`);
                    if (enderecoElement) {
                        enderecoElement.remove();
                    }
                    alert(`Endereço ${enderecoId} desativado com sucesso.`);
                } else {
                    console.error(`Falha ao desativar o endereço ${enderecoId}.`);
                    alert(`Falha ao desativar o endereço ${enderecoId}.`);
                }
            })
            .catch(error => {
                console.error(`Erro ao desativar o endereço ${enderecoId}: ${error.message}`);
                alert(`Erro ao desativar o endereço ${enderecoId}: ${error.message}`);
            });
    }
});
