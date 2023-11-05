function fetchCEPInfo(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                document.getElementById('enderecoInfo').innerHTML = `
                    <h4>Endereço</h4>
                    <p>Entrega</p>
                    <p>${data.logradouro}, ${data.bairro}</p>
                    <p>CEP: ${data.cep} - ${data.localidade}, ${data.uf}</p>
                `;
                showFreteOptions();
            }

            document.getElementById('cepInput').value = '';
        })
        .catch(error => {
            console.error('Erro ao consultar o CEP:', error);
            alert('Ocorreu um erro ao consultar o CEP. Tente novamente mais tarde.');
        });
}

function updateAddressInfoLoggedIn(clientId) {
    fetch(`/address/default/${clientId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('enderecoInfo').innerHTML = `
                <h4>Endereço</h4>
                <p>Entrega</p>
                <p>${data.street}, ${data.number} - ${data.neighborhood}</p>
                <p>CEP: ${data.zipCode} - ${data.city}, ${data.state}</p>
            `;
            showFreteOptions();
        })
        .catch(error => console.error(error));
    document.getElementById('enderecoDiv').style.display = 'block';
    document.getElementById('cepInputDiv').style.display = 'block';
}

function updateAddressInfoNotLoggedIn(cep) {
    fetchCEPInfo(cep);
    document.getElementById('enderecoDiv').style.display = 'block';
    document.getElementById('cepInputDiv').style.display = 'none';
}

document.getElementById('buscarEnderecoBtn').addEventListener('click', function () {
    const userName = localStorage.getItem('userName');
    const clientId = localStorage.getItem('clientId');
    const cepInput = document.getElementById('cepInput');
    const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP

    if (userName && clientId) {
        updateAddressInfoLoggedIn(clientId);
    } else {
        if (cep.length === 8) {
            updateAddressInfoNotLoggedIn(cep);
        } else {
            alert('CEP inválido. Informe um CEP válido com 8 dígitos.');
        }
    }
});

function showFreteOptions() {
    document.getElementById('frete-expresso').style.display = 'block';
    document.getElementById('frete-normal').style.display = 'block';
    document.getElementById('frete-gratis').style.display = 'block';

    const freteExpresso = 15.00;
    const freteNormal = 10.00;
    const freteGratis = 0.00;

    document.getElementById('frete-expresso-preco').textContent = freteExpresso.toFixed(2);
    document.getElementById('frete-normal-preco').textContent = freteNormal.toFixed(2);
    document.getElementById('frete-gratis-preco').textContent = freteGratis.toFixed(2);

    document.getElementById('freteDiv').style.display = 'block';
}


function showFreteOptions() {
    document.getElementById('frete-expresso').style.display = 'block';
    document.getElementById('frete-normal').style.display = 'block';
    document.getElementById('frete-gratis').style.display = 'block';

    // Atualize os valores de frete aqui
    const freteExpresso = 15.00;
    const freteNormal = 10.00;
    const freteGratis = 0.00;

    document.getElementById('frete-expresso-preco').textContent = freteExpresso.toFixed(2);
    document.getElementById('frete-normal-preco').textContent = freteNormal.toFixed(2);
    document.getElementById('frete-gratis-preco').textContent = freteGratis.toFixed(2);

    document.getElementById('freteDiv').style.display = 'block';
}

const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];

localStorage.setItem('products', JSON.stringify(produtos));

const products = JSON.parse(localStorage.getItem('products'));

const productList = document.getElementById('product-list');

const subtotalElement = document.getElementById('subtotal');
const freteElement = document.getElementById('frete');
const totalElement = document.getElementById('total');

function updateSubtotalAndTotal() {
    let subtotal = 0;

    produtos.forEach((produto) => {
        subtotal += produto.quantidade * produto.produto.price;
    });

    const frete = 10; // Valor do frete
    const total = subtotal + frete;

    subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    freteElement.textContent = `R$ ${frete.toFixed(2)}`;
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

updateSubtotalAndTotal();

function updateLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(produtos));
}

if (produtos && produtos.length > 0) {
    produtos.forEach((produto, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'd-flex justify-content-between';

        const img = document.createElement('img');
        img.src = produto.produto.images[0].imagePath;
        img.alt = 'Imagem do produto';
        img.className = 'align-self-start';

        const name = document.createElement('p');
        name.className = 'ml-3';
        name.textContent = produto.produto.name;

        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'ml-3';
        const quantityLabel = document.createElement('p');
        quantityLabel.textContent = 'Quantidade:';
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.name = 'quantidade_produtos';
        quantityInput.min = 1;
        quantityInput.max = 100;
        quantityInput.step = 1;
        quantityInput.value = produto.quantidade;

        quantityInput.addEventListener('change', () => {
            const newQuantity = parseInt(quantityInput.value, 10);
            produto.quantidade = newQuantity;
            const totalValue = newQuantity * produto.produto.price;
            value.innerHTML = `
        <p>Valor:</p>
        <p>R$ ${totalValue.toFixed(2)}
    `;

            updateSubtotalAndTotal();
            updateLocalStorage();
        });



        const trashLink = document.createElement('a');
        trashLink.href = '#';
        trashLink.className = 'ml-3 lixeira';
        trashLink.addEventListener('click', (event) => {
            event.preventDefault();
            removeProduct(index);
            alert('Produto excluído com sucesso!');
        });

        const trashImg = document.createElement('img');
        trashImg.src = 'Images/lixeira.png';
        trashImg.alt = 'Lixeira';

        const value = document.createElement('div');
        value.className = 'ml-3 text-right';
        const totalValue = produto.quantidade * produto.produto.price;
        value.innerHTML = `
            <p>Valor:</p>
            <p>R$ ${totalValue.toFixed(2)}</p>
        `;

        quantityDiv.appendChild(quantityLabel);
        quantityDiv.appendChild(quantityInput);

        trashLink.appendChild(trashImg);

        productDiv.appendChild(img);
        productDiv.appendChild(name);
        productDiv.appendChild(quantityDiv);
        productDiv.appendChild(trashLink);
        productDiv.appendChild(value);

        quantityInput.addEventListener('change', () => {
            const newQuantity = parseInt(quantityInput.value, 10);
            const totalValue = newQuantity * produto.produto.price;
            value.innerHTML = `
                <p>Valor:</p>
                <p>R$ ${totalValue.toFixed(2)}</p>
            `;
        });

        productList.appendChild(productDiv);
    });
}

function removeProduct(index) {
    produtos.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(produtos));
    location.reload();
}

function updateAddressInfo() {
    const userName = localStorage.getItem("userName");
    const enderecoDiv = document.getElementById('enderecoDiv');
    const cepInputDiv = document.getElementById('cepInputDiv');
    const enderecoInfo = document.getElementById('enderecoInfo');
    const cepInfo = document.getElementById('cepInfo');

    const clientId = localStorage.getItem("clientId");

    if (userName && clientId) {
        fetch(`/address/default/${clientId}`)
            .then(response => response.json())
            .then(data => {
                enderecoInfo.innerHTML = `
                    <h4>Endereço</h4>
                    <p>Entrega</p>
                    <p>${data.street}, ${data.number} - ${data.neighborhood}</p>
                    <p>CEP: ${data.zipCode} - ${data.city}, ${data.state}</p>
                `;
                showFreteOptions();

            })
            .catch(error => console.error(error));
        document.getElementById('enderecoDiv').style.display = 'block';
        document.getElementById('cepInputDiv').style.display = 'block';
    } else {
        enderecoDiv.style.display = 'none';
        cepInputDiv.style.display = 'block';
    }
}
updateAddressInfo();