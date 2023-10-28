document.getElementById('checkCep').addEventListener('click', function(event) {
    event.preventDefault();

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

const urlParams = new URLSearchParams(window.location.search);
const addressId = urlParams.get("addressId");

const urlParams2 = new URLSearchParams(window.location.search);
const customerId = urlParams2.get("customerId");

fetch(`/address/${addressId}`)
    .then(response => response.json())
    .then(addressData => {
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
    event.preventDefault();

    const addressKind = document.querySelector('input[name="addressKind"]:checked').value;
    const zipCode = document.getElementById('zipCode').value;
    const street = document.getElementById('street').value;
    const number = document.getElementById('number').value;
    const complement = document.getElementById('complement').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const enabled = true;
    const addressDefault = true;

    const updatedAddressData = {
        addressKind: addressKind,
        zipCode: zipCode,
        street: street,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state: state,
        enabled: enabled,
        addressDefault: addressDefault
    };

    fetch(`/customers/${customerId}/enderecos/${addressId}`, {
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
                window.location.href = "./enderecos.html";
            } else if (data && data.error) {
                alert('Erro ao atualizar o endereço: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar o endereço:', error);
        });
});

