const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'), 10);

if(urlParams != 0) {
    window.addEventListener('load', editarUser);

}

async function editarUser() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams)

        const id = parseInt(urlParams.get('id'), 10)

        const response = await fetch(`http://localhost:8080/api/usuarios/${id}/details`);
        const user_details = await response.json();

        console.log(user_details)

        document.querySelector("#userName").value = user_details.name;

        document.querySelector("#userEmail").value = user_details.email;

        document.querySelector("#userCPF").value = user_details.cpf;

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }
}

function redirecionarParaListar() {
    window.location.href = 'usuarios.html';
}


function salvar() {

    const passwordFront = document.querySelector("#password").value
    const password2Front = document.querySelector("#password2").value

    if(passwordFront != password2Front) {
        alert("senha deve ser igual")
    }


    const data = {
        name: document.querySelector("#userName").value,
        email: document.querySelector("#userEmail").value,
        password: passwordFront,
        password2 : password2Front,
        cpf: document.querySelector("#userCPF").value,
        role: document.querySelector("#userGrupo").value
    }
    console.log(urlParams)
    console.log(id)

    if(urlParams != 0) {
        data.id = id;
        
        fetch(`http://localhost:8080/api/usuarios/${id}/alterar`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.status === 200) {
                alert("Usuário alterado com sucesso!")
                window.location.href = "usuarios.html";
            }
    
            if(response.status === 400) {
                alert("Falha ao alterar usuário")
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar: ", error);
        });          
    
    } else {

        fetch("http://localhost:8080/api/usuarios/create", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')

            }
        }).then(function (response) {
            if (response.status === 200) {
                window.location.href = "usuarios.html";
            }
    
            if(response.status === 400) {
                alert("Usuário já cadastrado")
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar: ", error);
        });
    }
}