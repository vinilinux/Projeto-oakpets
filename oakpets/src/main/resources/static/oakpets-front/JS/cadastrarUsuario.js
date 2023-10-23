/*
async function fetchUser() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id'), 10)

        const response = await fetch(`api/usuarios/${id}/details`);
        const user_details = await response.json();

        var nome = user_details.name;
        var email = user_details.email;
        var cpf = user_details.cpf;
        var grupo = user_details.role;

        const userName = document.getElementById("userName");
        userName.textContent = nome;

        const userEmail = document.getElementById("userEmail");
        userEmail.textContent = email;

        const userCPF = document.getElementById("userCPF");
        userCPF.textContent = cpf;

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

fetchProducts();


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objetoCodificado = urlParams.get('dados');

const objetoParaEditar = JSON.parse(decodeURIComponent(objetoCodificado));

if (objetoParaEditar.name) {
    document.getElementById("userName").value = objetoParaEditar.name;
    userName = objetoParaEditar.name;
    console.log(objetoParaEditar.name);
} else {
    console.error("O objeto não contém um atributo 'name'.");
}

*/

function redirecionarParaListar() {
    window.location.href = 'usuarios.html';
}


function salvar() {
    
    const data = {
        name: document.querySelector("#userName").value,
        email: document.querySelector("#userEmail").value,
        password: document.querySelector("#password").value,
        cpf: document.querySelector("#userCPF").value,
        role: document.querySelector("#userGrupo").value
    }


    fetch("http://localhost:8080/api/usuarios/create", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(Response => Response.json(data)).catch(error => {
        console.error("Erro ao cadastrar: ", error);
    });

}