function getCustomerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = parseInt(urlParams.get("id"));
    return customerId;
}

const customerId = getCustomerIdFromURL();
fetch(`/customers/address/${customerId}`)
    .then(response => response.json())
    .then(customerData => {
        // Preencha os campos do formulário com os dados obtidos
        document.getElementById('name').value = customerData.name;
        document.getElementById('bday').value = customerData.bday;
        document.getElementById('cpf').value = customerData.cpf;
        document.getElementById('email').value = customerData.email;
        document.getElementById('password').value = customerData.password;
        document.getElementById('ConfirmPassword').value = customerData.password;
        document.getElementById('gender').value = customerData.gender;
    })
    .catch(error => {
        console.error('Erro ao carregar os dados do cliente:', error);
    });

function salvarPerfil(event) {
    if (event) {
        event.preventDefault();
    }

    const formData = new FormData(document.getElementById("customerForms"));

    const data = {
        name: formData.get("name"),
        bDay: formData.get("bday"),
        cpf: formData.get("cpf"),
        email: formData.get("email"),
        password: formData.get("password"),
        gender: formData.get("gender"),
    };

    const customerId = getCustomerIdFromURL();

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
                window.location.href = "./minha-conta.html";
            } else {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
        })
        .catch(error => {
            alert(error.message);
        });
}





