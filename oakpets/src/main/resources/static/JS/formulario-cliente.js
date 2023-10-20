document.addEventListener("DOMContentLoaded", function () {

    function obterClienteIdDaURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

    const clienteId = obterClienteIdDaURL();

    if (clienteId) {
        carregarDadosCliente(clienteId);
    } else {
        console.error("ID do cliente não encontrado na URL.");
    }

    function carregarDadosCliente(clienteId) {
        fetch(`/customers/${clienteId}`)
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("nome").value = data.name;
                document.getElementById("dataNascimento").value = data.bday;
                document.getElementById("cpf").value = data.cpf;
                document.getElementById("email").value = data.email;
                document.getElementById("senha").value = data.password;
                document.getElementById("genero").value = data.gender;

                document.getElementById("idEnderecoFaturamento").value = data.addresses[0].id;

                document.getElementById("tipoEnderecoFaturamento").value = data.addresses[0].addressKind;
                document.getElementById("cepFaturamento").value = data.addresses[0].zipCode;
                document.getElementById("enderecoFaturamento").value = data.addresses[0].street;
                document.getElementById("numeroFaturamento").value = data.addresses[0].number;
                document.getElementById("complementoFaturamento").value = data.addresses[0].complement;
                document.getElementById("bairroFaturamento").value = data.addresses[0].neighborhood;
                document.getElementById("cidadeFaturamento").value = data.addresses[0].city;
                document.getElementById("estadoFaturamento").value = data.addresses[0].state;

                document.getElementById("idEnderecoEntrega").value = data.addresses[1].id;
                document.getElementById("tipoEnderecoEntrega").value = data.addresses[1].addressKind;
                document.getElementById("cepEntrega").value = data.addresses[1].zipCode;
                document.getElementById("enderecoEntrega").value = data.addresses[1].street;
                document.getElementById("numeroEntrega").value = data.addresses[1].number;
                document.getElementById("complementoEntrega").value = data.addresses[1].complement;
                document.getElementById("bairroEntrega").value = data.addresses[1].neighborhood;
                document.getElementById("cidadeEntrega").value = data.addresses[1].city;
                document.getElementById("estadoEntrega").value = data.addresses[1].state;

            })
            .catch((error) => {
                console.error("Erro ao carregar os dados do cliente:", error);
            });
    }
});

function salvarPerfil() {

    const formData = new FormData(document.getElementById("customerForm"));
    const billingAddressData = new FormData(document.getElementById("billingAddressForm"));
    const deliveryAddressData = new FormData(document.getElementById("deliveryAddressForm"));

    const idEnderecoFaturamento = document.getElementById("idEnderecoFaturamento").value;
    const idEnderecoEntrega = document.getElementById("idEnderecoEntrega").value;


    const data = {
        name: formData.get("nome"),
        bDay: formData.get("dataNascimento"),
        cpf: formData.get("cpf"),
        email: formData.get("email"),
        password: formData.get("senha"),
        gender: formData.get("genero"),
        addresses: [
            {
                id: idEnderecoFaturamento,
                addressKind: billingAddressData.get("tipoEnderecoFaturamento"),
                zipCode: billingAddressData.get("cepFaturamento"),
                street: billingAddressData.get("enderecoFaturamento"),
                number: billingAddressData.get("numeroFaturamento"),
                complement: billingAddressData.get("complementoFaturamento"),
                neighborhood: billingAddressData.get("bairroFaturamento"),
                city: billingAddressData.get("cidadeFaturamento"),
                state: billingAddressData.get("estadoFaturamento")
            },
            {
                id: idEnderecoEntrega,
                addressKind: deliveryAddressData.get("tipoEnderecoEntrega"),
                zipCode: deliveryAddressData.get("cepEntrega"),
                street: deliveryAddressData.get("enderecoEntrega"),
                number: deliveryAddressData.get("numeroEntrega"),
                complement: deliveryAddressData.get("complementoEntrega"),
                neighborhood: deliveryAddressData.get("bairroEntrega"),
                city: deliveryAddressData.get("cidadeEntrega"),
                state: deliveryAddressData.get("estadoEntrega")
            }
        ]
    };

    const customerId = getCustomerIdFromURL();
    console.log(customerId)
    fetch(`/customers/${customerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
            alert("Cliente atualizado com sucesso!");
        } else {
            alert("Ocorreu um erro ao atualizar o cliente.");
        }
    })
    .catch(error => {
        console.error("Erro na solicitação de atualização:", error);
    });
}

function getCustomerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get("id");
    return customerId;
}

function formatarData(data) {
    const partesData = data.split('-'); // Suponha que a data esteja no formato "DD-MM-YYYY"
    if (partesData.length === 3) {
        const dia = partesData[0];
        const mes = partesData[1];
        const ano = partesData[2];
        return `${ano}-${mes}-${dia}`;
    } else {
        // Se a formatação estiver incorreta, você pode lidar com isso de acordo com sua necessidade
        return null; // Ou uma mensagem de erro
    }
}
