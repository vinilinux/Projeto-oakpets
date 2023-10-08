
document.querySelector(".login-card form").addEventListener("submit", function(event) {
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
                localStorage.setItem("userName", response.data);
                window.location.href = "./list-card.html";
            }
        })
        .catch(function (error) {
            loginError.textContent = "Falha no login. Por favor, tente novamente.";
            loginError.style.display = "block";
        });
});


function login(email, password) {
    axios.post('/api/login', {
        email: email,
        password: password
    })
        .then(function (response) {
            if (response.status === 200) {
                localStorage.setItem("userName", response.data);
                window.location.href = "./afterlogin.html";
            }
        })
        .catch(function (error) {
            console.error("Erro no login:", error);
        });
}
