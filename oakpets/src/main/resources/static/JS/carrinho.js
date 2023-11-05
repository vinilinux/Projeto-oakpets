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
    const freteOptions = {
        "frete-expresso": 15.00,
        "frete-normal": 10.00,
        "frete-gratis": 0.00
    };

    for (const optionId in freteOptions) {
        const option = document.getElementById(optionId);
        if (option) {
            option.setAttribute("data-frete", freteOptions[optionId]);
            option.addEventListener("change", updateSubtotalAndTotal);
        }
    }

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

    const selectedFreteOption = document.querySelector('input[name="frete"]:checked');

    if (selectedFreteOption) {
        const frete = parseFloat(selectedFreteOption.getAttribute("data-frete"));
        localStorage.setItem('selectedFrete', selectedFreteOption.id);
        localStorage.setItem('selectedFreteValue', frete);

        const total = subtotal + frete;

        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        freteElement.textContent = `R$ ${frete.toFixed(2)}`;
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    } else {
        const frete = 0.00;
        const total = subtotal + frete;

        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        freteElement.textContent = `R$ ${frete.toFixed(2)}`;
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
}

updateSubtotalAndTotal();


const freteOptions = document.querySelectorAll('input[name="frete"]');
freteOptions.forEach((option) => {
    option.addEventListener('change', updateSubtotalAndTotal);
});

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

document.addEventListener("DOMContentLoaded", function() {
    const selectedFreteId = localStorage.getItem('selectedFrete');
    const selectedFreteValue = localStorage.getItem('selectedFreteValue');
    if (selectedFreteId) {
        const selectedFreteOption = document.getElementById(selectedFreteId);
        if (selectedFreteOption) {
            selectedFreteOption.checked = true;
        }
        if (selectedFreteValue) {
            freteElement.textContent = `R$ ${parseFloat(selectedFreteValue).toFixed(2)}`;
        }
        updateSubtotalAndTotal();
    }
});

const paymentButton = document.getElementById('paymentButton');

paymentButton.addEventListener('click', function () {
    const userName = localStorage.getItem('userName');
    const clientId = localStorage.getItem('clientId');
    const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (userName && clientId) {
        const pedido = {
            clientId: clientId,
            totalValue: parseFloat(totalElement.textContent.replace('R$ ', '')),
            freteValue: parseFloat(freteElement.textContent.replace('R$ ', '')),
            endereco: document.getElementById('enderecoInfo').textContent.trim(),
            produtos: produtos.map((produto) => {
                return {
                    id: produto.produto.id,
                    quantidade: produto.quantidade,
                    totalProduto: produto.quantidade * produto.produto.price,
                    nomeProduto: produto.produto.name,
                    imagemProduto: produto.produto.images[0].imagePath
                };
            })
        };

        localStorage.setItem('pedido', JSON.stringify(pedido));

        window.location.href = 'pagamento.html';
    } else {
        window.location.href = 'login-cliente.html';
    }
});

updateAddressInfo();