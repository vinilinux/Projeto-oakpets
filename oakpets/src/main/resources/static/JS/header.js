function updateUIBasedOnLoginStatus() {
    const userName = localStorage.getItem("userName");
    const userStatusElement = document.getElementById('userStatus');
    const logoutLink = document.getElementById('logoutLink');

    console.log("Valor de userName em localStorage:", localStorage.getItem("userName"));


    if (userName) {
        // Usando uma classe CSS para estilizar
        userStatusElement.classList.add('btnEntrar');
        userStatusElement.innerHTML = `<i class="bi bi-person-fill"></i> <a href="minha-conta.html">${userName}</a>`;
        logoutLink.style.display = 'inline';
    } else {
        // Remover a classe CSS para reverter a estilização
        userStatusElement.classList.remove('btnEntrar');
        userStatusElement.innerHTML = `<a href="./login-cliente.html"><button class="btn btnEntrar text-left" type="submit"><i class="bi bi-person-fill"></i> <span>Entre ou <br> Cadastre-se</span></button></a>`;
        logoutLink.style.display = 'none';
    }
}

function handleLogout() {
    const confirmation = confirm("Deseja realmente sair?");
    if (confirmation) {
        localStorage.removeItem("userName");
        updateUIBasedOnLoginStatus();
        window.location.href = "./list-card.html";
    }
}

updateUIBasedOnLoginStatus();