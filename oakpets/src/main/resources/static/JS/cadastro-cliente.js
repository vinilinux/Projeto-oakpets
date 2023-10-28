document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('customerForms');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        sendFormData();
    });
});

function sendFormData() {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('ConfirmPassword');

    if (passwordField.value !== confirmPasswordField.value) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
    }

    let customerData = {
        name: document.getElementById("name").value,
        bDay: document.getElementById("bday").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        gender: document.getElementById("gender").value
    };

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
                window.location.href = "./login-cliente.html"; // Redireciona o usuário
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

