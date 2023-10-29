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

            const statusCell = createSelectAndHandleChange(user); // Retorna o td com o select
            linha.appendChild(statusCell);

            const grupoCell = document.createElement('td');
            grupoCell.textContent = user.role;
            linha.appendChild(grupoCell);

            const objetoCodificado = encodeURIComponent(JSON.stringify(user));
            const acaoCell = document.createElement('td');
            const button = document.createElement('a');
            button.href = `cadastrarUsuario.html?id=${user.idUser}`;
            button.textContent = "Editar";
            button.classList.add('btn', 'btn-primary');
            acaoCell.appendChild(button);
            linha.appendChild(acaoCell);

            tabela.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao buscar usuários', error);
    }
}

const INPUT_BUSCA = document.getElementById('search');
const TABELA_USERS = document.getElementById('users');

INPUT_BUSCA.addEventListener('keyup', () => {
    let expressao = INPUT_BUSCA.value.toLowerCase();

    if (expressao.length === 1) {
        return;
    }

    let linhas = TABELA_USERS.getElementsByTagName('tr');

    for (let posicao in linhas) {
        if (isNaN(posicao)) {
            continue;
        }

        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase();

        if (conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = '';
        } else {
            linhas[posicao].style.display = 'none';
        }
    }
});

function createSelectAndHandleChange(user) {
    const statusCell = document.createElement('td');
    const select = document.createElement('select');
    select.classList.add('form-select');

    const opcoes = [
        { valor: true, texto: 'Ativo' },
        { valor: false, texto: 'Inativo' }
    ];

    opcoes.forEach((opcao) => {
        const option = document.createElement('option');
        option.textContent = opcao.texto;
        option.value = opcao.valor;
        if (opcao.valor === user.status) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    select.addEventListener('change', function () {
        const valorSelecionado = select.value;

        const confirmarMudanca = window.confirm('Deseja confirmar a mudança?');

        if (confirmarMudanca) {
            fetch(`http://localhost:8080/api/usuarios/${user.idUser}/status`, {
                method: 'PUT',
                body: JSON.stringify({ ativo: valorSelecionado }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('API Response:', data);
                })
                .catch(error => {
                    console.error('Erro ao chamar a API:', error);
                });
        } else {
            console.log("Cancelada");
        }
    });

    return statusCell.appendChild(select); // Retorna o td com o select
}
