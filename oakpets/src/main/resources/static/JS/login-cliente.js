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
                const userName = response.data.userName; // Obtém o nome do cliente da resposta

                // Armazene o nome do cliente no `localStorage`
                localStorage.setItem("userName", userName);

                // Construa o URL do endpoint com o ID do cliente
                const checkBillingAddressUrl = `/address/checkBillingAddress/${response.data.clientId}`;

                // Agora, você pode usar a variável `checkBillingAddressUrl` na sua solicitação para verificar o endereço de faturamento.
                axios.get(checkBillingAddressUrl)
                    .then(function (addressResponse) {
                        if (addressResponse.data) {
                            // Redirecione para a tela list-card.html
                            window.location.href = "./list-card.html";
                        } else {
                            // Exiba um alert e redirecione para a página de cadastro de endereço com o ID do cliente como parâmetro
                            alert("Você não possui endereço de faturamento cadastrado, faça o cadastro agora.");
                            const id = response.data.clientId; // Obtém o ID do cliente da resposta
                            const url = `./cadastro-endereco-cliente.html?id=${id}&addressResponse=${addressResponse.data}`;
                            window.location.href = url;
                        }

                    })
                    .catch(function (addressError) {
                        // Lida com erros ao verificar o endereço de faturamento
                        console.error("Erro ao verificar endereço de faturamento:", addressError);
                    });
            }
        })
        .catch(function (error) {
            loginError.textContent = "Falha no login. Por favor, tente novamente.";
            loginError.style.display = "block";
        });
});
