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

// Obtenha o ID do endereço da URL ou de outra fonte
const urlParams = new URLSearchParams(window.location.search);
const addressId = urlParams.get("id"); // Certifique-se de que o parâmetro correto seja usado

// Se o addressId não estiver presente ou não for válido, você deve lidar com isso apropriadamente

// Realize uma requisição GET para obter os dados do endereço
fetch(`/address/${addressId}`)
    .then(response => response.json())
    .then(addressData => {
        // Preencha os campos do formulário com os dados obtidos
        document.querySelector('input[name="addressKind"][value="' + addressData.addressKind + '"]').checked = true;
        document.getElementById('zipCode').value = addressData.zipCode;
        document.getElementById('street').value = addressData.street;
        document.getElementById('number').value = addressData.number;
        document.getElementById('complement').value = addressData.complement;
        document.getElementById('neighborhood').value = addressData.neighborhood;
        document.getElementById('city').value = addressData.city;
        document.getElementById('state').value = addressData.state;
    })
    .catch(error => {
        console.error('Erro ao carregar os dados do endereço:', error);
    });

document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtenha os dados do formulário para atualização
    const addressKind = document.querySelector('input[name="addressKind"]:checked').value;
    const zipCode = document.getElementById('zipCode').value;
    const street = document.getElementById('street').value;
    const number = document.getElementById('number').value;
    const complement = document.getElementById('complement').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    // Construa o objeto com os dados para atualização
    const updatedAddressData = {
        addressKind: addressKind,
        zipCode: zipCode,
        street: street,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state: state
    };

    // Realize a requisição PUT para atualizar o endereço
    fetch(`/address/${addressId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAddressData)
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.id) {
                alert('Endereço atualizado com sucesso!');
                // Redirecione o usuário para a página desejada após a atualização, se necessário.
                // window.location.href = 'sua_pagina_de_redirecionamento.html';
            } else if (data && data.error) {
                alert('Erro ao atualizar o endereço: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar o endereço:', error);
        });
});

