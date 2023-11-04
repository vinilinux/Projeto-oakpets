const produtos = [
    {
        image: 'img/1698870816249-r1.png',
        name: 'Ração Seca Nutrilus Pro+ Frango & Carne para Cães Adultos',
        value: 163.92,
        quantity: 1
    },
    {
        image: 'img/1698870816249-r1.png',
        name: 'Ração Seca Nutrilus Pro+ Frango & Carne para Cães Adultos',
        value: 49.99,
        quantity: 3
    },
    {
        image: 'img/1698870816249-r1.png',
        name: 'Ração Seca Nutrilus Pro+ Frango & Carne para Cães Adultos',
        value: 29.99,
        quantity: 2
    }
];

function calculateTotal(subtotal, frete) {
    const total = subtotal + frete;
    return total;
}
function updateSubtotal() {
    const products = JSON.parse(localStorage.getItem('products'));
    const subtotal = calculateSubTotal(products);

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;

    return subtotal;
}

function updateFrete() {
    const novoFrete = 15.00;

    document.getElementById('frete').textContent = `R$ ${novoFrete.toFixed(2)}`;
    return novoFrete;
}



localStorage.setItem('products', JSON.stringify(produtos));

function calculateSubTotal(products) {
    let subtotal = 0;
    products.forEach(product => {
        subtotal += product.value * product.quantity;
    });
    return subtotal;
}

calculateTotal(updateSubtotal(), updateFrete());

function updateSubTotal(subtotal) {
    const totalElement = document.getElementById('subtotal');
    if (totalElement) {
        totalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    }
}

function updateTotal() {
    const subtotal = updateSubtotal();
    const frete = updateFrete();
    const total = calculateTotal(subtotal, frete);

    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
}

const products = JSON.parse(localStorage.getItem('products'));

const productList = document.getElementById('product-list');

if (products && products.length > 0) {

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'd-flex justify-content-between';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = 'Imagem do produto';
        img.className = 'align-self-start';

        const name = document.createElement('p');
        name.className = 'ml-3';
        name.textContent = product.name;

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
        quantityInput.value = product.quantity;

        quantityInput.addEventListener('change', () => {
            const newQuantity = parseInt(quantityInput.value, 10);
            product.quantity = newQuantity;
            const totalValue = product.value * newQuantity;
            value.innerHTML = `
            <p>Valor:</p>
            <p>R$ ${totalValue.toFixed(2)}
        `;
            const subtotal = calculateSubTotal(products);
            updateSubTotal(subtotal);
            localStorage.setItem('products', JSON.stringify(products));

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
        const totalValue = product.value * product.quantity;
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
            const totalValue = product.value * newQuantity;
            value.innerHTML = `
            <p>Valor:</p>
            <p>R$ ${totalValue.toFixed(2)}</p>
        `;
        });
        const subtotal = calculateSubTotal(products);
        updateSubTotal(subtotal);


        productList.appendChild(productDiv);
    });
}


function removeProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));

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