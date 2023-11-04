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
                    <p>${data.street}, ${data.number} - ${data.complement}</p>
                    <p>CEP: ${data.zipCode} - ${data.city}, ${data.state}</p>
                `;
            })
            .catch(error => console.error(error));
        enderecoDiv.style.display = 'block';
        cepInputDiv.style.display = 'none';
    } else {
        enderecoDiv.style.display = 'none';
        cepInputDiv.style.display = 'block';
    }
}

updateAddressInfo();