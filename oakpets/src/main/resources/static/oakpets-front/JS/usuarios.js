window.addEventListener('load', fetchUsers);

function redirecionarParaCadastro() {
    window.location.href = 'cadastrarUsuario.html';
}



async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8080/api/usuarios');
        const users = await response.json();

        const tabela = document.querySelector('tbody');
        
        users.forEach((user, index) => {
            let userCount = 0;

            const linha = document.createElement('tr');

            if (index % 2 === 0) {
                linha.classList.add('table-active');
            }

            const nomeCell = document.createElement('th');
            nomeCell.textContent = user.name;
            linha.appendChild(nomeCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            linha.appendChild(emailCell);

            const statusCell = document.createElement('td');
            const select = document.createElement('select');
            select.classList.add('form-select');
            
            const opcoes = ["Ativo", "Inativo"];
            opcoes.forEach((opcao) => {
                const option = document.createElement('option');
                option.textContent = user.status;
                select.appendChild(option);
            });
            
            select.value = user.status;
            statusCell.appendChild(select);
            linha.appendChild(statusCell);

            const grupoCell = document.createElement('td');
            grupoCell.textContent = user.role;
            linha.appendChild(grupoCell);

            const objetoCodificado = encodeURIComponent(JSON.stringify(user));
            const acaoCell = document.createElement('td');
            const button = document.createElement('a');
            button.href = `cadastrarUsuario.html?dados=${objetoCodificado}`;
            button.textContent = "Editar";
            button.classList.add('btn', 'btn-primary');
            acaoCell.appendChild(button);
            linha.appendChild(acaoCell);

            userCount++;
            tabela.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao buscar usuários', error);
    }
}
