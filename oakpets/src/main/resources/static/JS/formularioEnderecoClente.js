document.getElementById('checkCep').addEventListener('click', function() {
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

    const addressData = {
        addressKind: addressKind,
        street: street,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state: state,
        zipCode: zipCode
    };
    console.log('customerId:', customerId);
    fetch(`/customers/${customerId}/addresses`, {
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
            } else if (data && data.error) {
                alert('Erro ao cadastrar o endereço: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar o formulário:', error);
        });
}

document.getElementById('addressForms').addEventListener('submit', function(event) {
    event.preventDefault();
    sendAddressData();
});

function obterClienteIdDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}
