document.querySelector(".login-card form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const loginError = document.getElementById('loginError');

    axios.post('/api/login', {
        email: email,
        password: password
    })
        .then(function (response) {
            if (response.status === 200) {
                const userName = response.data.userName;

                localStorage.setItem("userName", userName);

                const checkBillingAddressUrl = `/address/checkBillingAddress/${response.data.clientId}`;

                 axios.get(checkBillingAddressUrl)
                    .then(function (addressResponse) {
                        if (addressResponse.data) {
                            window.location.href = "./list-card.html";
                        } else {
                            alert("Você não possui endereço de faturamento cadastrado, faça o cadastro agora.");
                            const id = response.data.clientId;
                            const url = `./cadastro-endereco-cliente.html?id=${id}&addressResponse=${addressResponse.data}`;
                            window.location.href = url;
                        }

                    })
                    .catch(function (addressError) {
                        console.error("Erro ao verificar endereço de faturamento:", addressError);
                    });
            }
        })
        .catch(function (error) {
            loginError.textContent = "Falha no login. Por favor, tente novamente.";
            loginError.style.display = "block";
        });
});
