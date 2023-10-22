document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('customerForms');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        sendFormData();
    });
});


//Pega a informação do formulário
function sendFormData() {
    let customerData = {
        name: document.getElementById("name").value,
        bDay: document.getElementById("bday").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        gender: document.getElementById("gender").value
    };

    //envia para a API
    fetch('/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
    })
        .then(response => {

            if (response.status === 201) {
                alert('Cliente cadastrado com sucesso!');
                window.location.href = "./login-customer.html"; // Redireciona o usuário
                return null;
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
