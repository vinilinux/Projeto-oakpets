document.addEventListener('DOMContentLoaded', validartoken);
token = localStorage.getItem('token')
async function validartoken() {

    if (token === null) {
        window.location.href = 'login.html'
    }

    try {
        const response = await fetch('http://localhost:8080/auth/validate', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        if (response.status === 401) {
            window.location.href = 'login.html'
        }

        const role = await response.json();
        console.log(role)

        if (role === "ESTOQUE") {
            const ul = document.querySelector('ul');
            const li = ul.querySelector('li:nth-child(3)');
            li.style.display = 'none';
            const button = document.querySelector('p.botoes');
            button.style.display = 'none';
        }

    } catch (error) {
        console.log(error);
        window.location.href = 'erro.html'
    }
}