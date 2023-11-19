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

    const newPassword = formData.get("password");
    const confirmPassword = formData.get("ConfirmPassword");

    if (newPassword === '' || confirmPassword === '') {
        alert("Por favor, preencha ambos os campos de senha e confirmação de senha.");
        return; // Evita o envio dos dados se as senhas estiverem em branco.
    }

    if (newPassword !== confirmPassword) {
        alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
        return; // Evita o envio dos dados se as senhas não coincidirem.
    }

    const data = {
        name: formData.get("name"),
        bDay: formData.get("bday"),
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        password: newPassword, // Use a nova senha aqui
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

function updateUIBasedOnLoginStatus() {
    const userName = localStorage.getItem("userName");
    const userStatusElement = document.getElementById('userStatus');
    const logoutLink = document.getElementById('logoutLink');

    console.log("Valor de userName em localStorage:", localStorage.getItem("userName"));

    if (userName) {
        userStatusElement.classList.add('btnEntrar');
        userStatusElement.innerHTML = `<i class="bi bi-person-fill"></i> <a href="minha-conta.html">${userName}</a>`;
        logoutLink.style.display = 'inline';
    } else {
        userStatusElement.classList.remove('btnEntrar');
        userStatusElement.innerHTML = `<a href="./login-cliente.html"><button class="btn btnEntrar text-left" type="submit"><i class="bi bi-person-fill"></i> <span>Entre ou <br> Cadastre-se</span></button></a>`;
        logoutLink.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateUIBasedOnLoginStatus();
});





