document.getElementById('checkCep').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const cep = document.getElementById('zipCode').value;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            document.getElementById('state').value = data.uf;
            document.getElementById('city').value = data.localidade;
            document.getElementById('neighborhood').value = data.bairro;
            document.getElementById('complement').value = data.complemento;
            document.getElementById('street').value = data.logradouro;
        })
        .catch(error => {
            console.error('Erro ao consultar o CEP:', error);
        });
});

function sendAddressData() {
    // Obtenha o ID do cliente da URL
    const customerId = parseInt(obterClienteIdDaURL(), 10);

    if (!customerId) {
        console.error("ID do cliente não encontrado na URL.");
        return;
    }

    const addressKind = document.querySelector('input[name="addressKind"]:checked').value;
    const number = document.getElementById('number').value;
    const zipCode = document.getElementById('zipCode').value;
    const street = document.getElementById('street').value;
    const complement = document.getElementById('complement').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const enabled = true;
    const address_default = true;

    const addressData = {
        addressKind: addressKind,
        street: street,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state: state,
        zipCode: zipCode,
        enabled: enabled
    };

    // Primeiro, verifique a existência do endereço de faturamento
    fetch(`/address/checkBillingAddress/${customerId}`)
        .then(response => response.json())
        .then(existingBillingAddress => {
            if (existingBillingAddress && addressKind === "Faturamento") {
                // Se já existe um endereço de faturamento, você pode atualizar ou lidar com isso de acordo com sua lógica.
                alert('Já existe um endereço de faturamento cadastrado no sistema.');
            } else {
                // Se não existe um endereço de faturamento, você pode prosseguir com o cadastro.
                fetch(`/address/create/${customerId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addressData)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.id) {
                            alert('Endereço cadastrado com sucesso!');



                            // Verificar se o último endereço cadastrado foi de faturamento
                            if (addressKind === "Faturamento") {
                                // Verificar se o cliente possui endereço de entrega cadastrado
                                fetch(`/address/checkDeliveryAddress/${customerId}`)
                                    .then(response => response.json())
                                    .then(existingDeliveryAddress => {
                                        if (!existingDeliveryAddress) {
                                            const confirmCopy = confirm("Deseja copiar as informações do endereço de faturamento para o endereço de entrega?");
                                            if (confirmCopy) {
                                                // Aqui você pode copiar as informações do endereço de faturamento
                                                const deliveryAddressData = { ...addressData, addressKind: "Entrega" };

                                                // Enviar os dados do endereço de entrega
                                                fetch(`/address/create/${customerId}`, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify(deliveryAddressData)
                                                })
                                                    .then(response => response.json())
                                                    .then(deliveryData => {
                                                        if (deliveryData && deliveryData.id) {
                                                            alert('Endereço de entrega cadastrado com sucesso!');
                                                            window.location.href = `enderecos.html?id=${customerId}`;
                                                        } else if (deliveryData && deliveryData.error) {
                                                            alert('Erro ao cadastrar o endereço de entrega: ' + deliveryData.error);
                                                        }
                                                    })
                                                    .catch(error => {
                                                        console.error('Erro ao enviar o formulário de endereço de entrega:', error);
                                                    });
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Erro ao verificar o endereço de entrega:', error);
                                    });
                            }
                        } else if (data && data.error) {
                            alert('Erro ao cadastrar o endereço: ' + data.error);
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao enviar o formulário:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Erro ao verificar o endereço de faturamento:', error);
        });
}

document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    sendAddressData();
});

function obterClienteIdDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function configureRadioButtons() {
    const urlParams = new URLSearchParams(window.location.search);
    const AddressResponse = urlParams.get("addressResponse");

    const entregaRadioButton = document.getElementById('entrega');
    const faturamentoRadioButton = document.getElementById('faturamento');

    if (AddressResponse === "false") {
        faturamentoRadioButton.checked = true;
        entregaRadioButton.disabled = true;
    }
}


document.addEventListener("DOMContentLoaded", configureRadioButtons);