window.addEventListener('load', fetchProducts);

function redirecionarParaCadastro() {
    window.location.href = 'cadastrarProduto.html';
}

let currentPage = 1;
const productsPerPage = 10;

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/products/all');
        const products = await response.json();

        // Divida a lista de produtos em páginas
        const totalPages = Math.ceil(products.length / productsPerPage);
        const startIdx = (currentPage - 1) * productsPerPage;
        const endIdx = startIdx + productsPerPage;
        const displayedProducts = products.slice(startIdx, endIdx);

        const tabela = document.querySelector('tbody');
        tabela.innerHTML = ''; // Limpe a tabela antes de preenchê-la novamente

        displayedProducts.forEach((product, index) => {
            const linha = document.createElement('tr');

            if (index % 2 === 0) {
                linha.classList.add('table-active');
            }

            const idCell = document.createElement('th');
            idCell.textContent = product.idProduct;
            linha.appendChild(idCell);

            const nomeCell = document.createElement('td');
            nomeCell.textContent = product.name;
            linha.appendChild(nomeCell);

            const qtdCell = document.createElement('td');
            qtdCell.textContent = product.amount;
            linha.appendChild(qtdCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = product.price;
            linha.appendChild(priceCell);

            const statusCell = createSelectAndHandleChange(product); // Retorna o td com o select
            linha.appendChild(statusCell);

            const acaoCell = document.createElement('td');
            const button = document.createElement('a');
            button.href = `cadastrarProduto.html?id=${product.idProduct}`;
            button.textContent = "Editar";
            button.classList.add('btn', 'btn-primary');
            button.style.marginRight = '10px';
            acaoCell.appendChild(button);
            linha.appendChild(acaoCell);

            const visualizarCell = document.createElement('td');
            const buttonVisualizar = document.createElement('a');
            buttonVisualizar.href = `cadastrarProduto.html?id=${product.idProduct}`;
            buttonVisualizar.textContent = "Vizualizar";
            buttonVisualizar.classList.add('btn', 'btn-danger');
            buttonVisualizar.style.marginLeft = '10px';
            acaoCell.appendChild(buttonVisualizar);
            linha.appendChild(visualizarCell);

            tabela.appendChild(linha);
        });

        // Adicione a seção de paginação com base no código HTML fornecido
        const paginationSection = document.querySelector('div.pagination-section');
        paginationSection.innerHTML = ''; // Limpe a seção de paginação antes de preenchê-la novamente

        const paginationUl = document.createElement('ul');
        paginationUl.classList.add('pagination');

        const previousPageItem = document.createElement('li');
        previousPageItem.classList.add('page-item');
        if (currentPage === 1) {
            previousPageItem.classList.add('disabled');
        }
        const previousPageLink = document.createElement('a');
        previousPageLink.classList.add('page-link');
        previousPageLink.href = '#';
        previousPageLink.textContent = '«';
        previousPageLink.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                fetchProducts();
            }
        });
        previousPageItem.appendChild(previousPageLink);

        // Adicione os botões de página com base no número total de páginas
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentPage) {
                pageItem.classList.add('active');
            }

            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', () => {
                currentPage = i;
                fetchProducts();
            });

            pageItem.appendChild(pageLink);
            paginationUl.appendChild(pageItem);
        }

        const nextPageItem = document.createElement('li');
        nextPageItem.classList.add('page-item');
        if (currentPage === totalPages) {
            nextPageItem.classList.add('disabled');
        }
        const nextPageLink = document.createElement('a');
        nextPageLink.classList.add('page-link');
        nextPageLink.href = '#';
        nextPageLink.textContent = '»';
        nextPageLink.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                fetchProducts();
            }
        });
        nextPageItem.appendChild(nextPageLink);

        paginationUl.appendChild(previousPageItem);
        paginationUl.appendChild(nextPageItem);

        paginationSection.appendChild(paginationUl);
    } catch (error) {
        console.error('Erro ao buscar produtos', error);
    }
}



const INPUT_BUSCA = document.getElementById('search');
const TABELA_USERS = document.getElementById('products');
const LINHA_DE_CABECALHO = TABELA_USERS.getElementsByTagName('tr')[0];

INPUT_BUSCA.addEventListener('keyup', () => {
    let expressao = INPUT_BUSCA.value.toLowerCase();

    let linhas = TABELA_USERS.getElementsByTagName('tr');

    for (let posicao = 1; posicao < linhas.length; posicao++) {
        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase();

        if (conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = '';
        } else {
            linhas[posicao].style.display = 'none';
        }
    }
});


function createSelectAndHandleChange(product) {
    const statusCell = document.createElement('td');
    const select = document.createElement('select');
    select.classList.add('form-select');

    const opcoes = [
        'ativo',
        'inativo'
    ];

    opcoes.forEach((opcao) => {
        const option = document.createElement('option');
        option.textContent = opcao.charAt(0).toUpperCase() + opcao.slice(1); // Capitalize the option text
        option.value = opcao;
        if (opcao === product.status) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    select.addEventListener('change', function () {
        const valorSelecionado = select.value;

        const confirmarMudanca = window.confirm('Deseja confirmar a mudança?');

        if (confirmarMudanca) {
            fetch(`http://localhost:8080/products/${product.idProduct}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status: valorSelecionado }),
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

    return statusCell.appendChild(select);
}
