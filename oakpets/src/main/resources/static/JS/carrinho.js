document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get("id");

    function recuperarInformacoesDoCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        return carrinho;
    }

    function atualizarIconeCarrinho() {
        const carrinho = recuperarInformacoesDoCarrinho();
        const quantidadeItens = carrinho.length;
        const contadorCarrinho = document.getElementById("contador-carrinho");

        console.log("Iniciando atualizarIconeCarrinhoGlobal");

        if (contadorCarrinho) {
            contadorCarrinho.textContent = quantidadeItens;
            contadorCarrinho.style.display = quantidadeItens > 0 ? 'inline' : 'none';
        }

        console.log("AtualizarIconeCarrinhoGlobal concluído com sucesso");
    }



    atualizarIconeCarrinho();

});


function fetchCEPInfo(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {

                document.getElementById('enderecoInfo').innerHTML = `
                    
                    <h4><i class="bi bi-geo-alt-fill"></i> Endereço</h4>
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

function updateAddressInfoLoggedIn(clientId, newCep) {
    if (newCep) {
        fetchCEPInfo(newCep);
    } else {
        fetch(`/address/default/${clientId}`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('enderecoId', data.id);
                document.getElementById('enderecoInfo').innerHTML = `
                    
                    <h4><i class="bi bi-geo-alt-fill"></i> Endereço</h4>
                    <p>Entrega</p>
                    <p>${data.street}, ${data.number} - ${data.neighborhood}</p>
                    <p>CEP: ${data.zipCode} - ${data.city}, ${data.state}</p>
                     
                `;
                showFreteOptions();
            })
            .catch(error => console.error(error));
    }
    document.getElementById('enderecoDiv').style.display = 'block';
    document.getElementById('cepInputDiv').style.display = 'block';
}

function updateAddressInfoNotLoggedIn(cep) {
    fetchCEPInfo(cep);
    document.getElementById('enderecoDiv').style.display = 'block';
    // document.getElementById('cepInputDiv').style.display = 'none';

}

document.getElementById('buscarEnderecoBtn').addEventListener('click', function () {
    const userName = localStorage.getItem('userName');
    const clientId = localStorage.getItem('clientId');
    const cepInput = document.getElementById('cepInput');
    const cep = cepInput.value.replace(/\D/g, '');

    if (userName && clientId) {
        updateAddressInfoLoggedIn(clientId, cep);
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

function attachSelectAddressClickEvent(clientId) {
    const selectAddressLink = document.getElementById('selectAddress');
    selectAddressLink.addEventListener('click', (event) => {
        event.preventDefault();
        openAddressPopup(clientId);
    });
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
                localStorage.setItem('enderecoId', data.id);
                enderecoInfo.innerHTML = `

                    <h4><i class="bi bi-geo-alt-fill"></i> Endereço</h4>
                    <p>Entrega</p>
                    <p>${data.street}, ${data.number} - ${data.neighborhood}</p>
                    <p>CEP: ${data.zipCode} - ${data.city}, ${data.state}</p>
                    <a href="#" id="selectAddress">Selecionar outro endereço</a>
                    <a href="cadastro-endereco-cliente.html?id=${clientId}">Adicionar Novo Endereço</a>
                   
                `;


                showFreteOptions();

                // Adicione um evento de clique à tag 'Selecionar outro endereço' e passe clientId como parâmetro
                attachSelectAddressClickEvent(clientId);
            })
            .catch(error => console.error(error));

        enderecoDiv.style.display = 'block';
        cepInputDiv.style.display = 'block';
    } else {
        enderecoDiv.style.display = 'none';
        cepInputDiv.style.display = 'block';
    }
}





function openAddressPopup(clientId) {
    const addressPopup = document.getElementById('addressPopup');
    const addressList = document.getElementById('addressList');


    addressList.innerHTML = '';


    addressPopup.style.display = 'block';


    fetch(`/address/delivery/${clientId}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(address => {
                const addressItem = document.createElement('li');
                addressItem.innerHTML = `
                    <a href="#" class="selectAddress" data-addressid="${address.id}">
                        ${address.street}, ${address.number} - ${address.neighborhood}, CEP: ${address.zipCode}
                    </a>
                `;
                addressList.appendChild(addressItem);
            });


            const selectAddressLinks = document.querySelectorAll('.selectAddress');
            selectAddressLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const selectedAddressId = link.getAttribute('data-addressid');
                    updateCartWithSelectedAddress(selectedAddressId, clientId);
                    addressPopup.style.display = 'none';
                });
            });
        })
        .catch(error => console.error(error));

    const closePopupLink = document.getElementById('closePopup');
    closePopupLink.addEventListener('click', (event) => {
        event.preventDefault();
        addressPopup.style.display = 'none';
    });

    attachSelectAddressClickEvent(clientId);
}

const cart = {
    address: {}
};
function updateCartWithSelectedAddress(selectedAddressId, clientId) {

    fetch(`/address/${selectedAddressId}`)
        .then(response => response.json())
        .then(selectedAddress => {

            cart.address = selectedAddress;
            localStorage.setItem('enderecoId', selectedAddress.id);

            const enderecoInfo = document.getElementById('enderecoInfo');
            enderecoInfo.innerHTML = `
                <h4><i class="bi bi-geo-alt-fill"></i> Endereço</h4>
                <p>Entrega</p>
                <p>${selectedAddress.street}, ${selectedAddress.number} - ${selectedAddress.neighborhood}</p>
                <p>CEP: ${selectedAddress.zipCode} - ${selectedAddress.city}, ${selectedAddress.state}</p>
                <a href="#" id="selectAddress">Selecionar outro endereço</a>
                <a href="cadastro-endereco-cliente.html?id=${clientId}">Adicionar Novo Endereço</a>
            `;


            const selectAddressLink = document.getElementById('selectAddress');
            selectAddressLink.addEventListener('click', (event) => {
                event.preventDefault();
                openAddressPopup(clientId);
            });


            const addressPopup = document.getElementById('addressPopup');
            addressPopup.style.display = 'none';


        })
        .catch(error => console.error(error));
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
        productDiv.className = 'd-flex justify-content-between productDiv';

        const img = document.createElement('img');
        img.src = produto.produto.images[0].imagePath;
        img.alt = 'Imagem do produto';
        img.className = 'align-self-start imageProduct';

        const name = document.createElement('p');
        name.className = 'ml-3 productName';
        name.textContent = produto.produto.name;

        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'ml-3';
        const quantityLabel = document.createElement('p');
        quantityLabel.className = 'quantityLabel';
        quantityLabel.textContent = 'Quantidade:';
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.name = 'quantidade_produtos';
        quantityInput.min = 1;
        quantityInput.max = 100;
        quantityInput.step = 1;
        quantityInput.value = produto.quantidade;
            quantityInput.className = 'quantityInput';

        quantityInput.addEventListener('change', () => {
            const newQuantity = parseInt(quantityInput.value, 10);
            produto.quantidade = newQuantity;
            const totalValue = newQuantity * produto.produto.price;
            value.innerHTML = `
        <p class="valueLabel">Valor:</p>
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
            <p class="valueLabel">Valor:</p>
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
    const selectedFreteOption = document.querySelector('input[name="frete"]:checked'); // Obtém a opção de frete selecionada

    if (userName && clientId) {
        if (selectedFreteOption) {
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
            alert('Por favor, selecione uma opção de frete antes de prosseguir.');
        }
    } else {
        window.location.href = 'login-cliente.html';
    }
});
updateAddressInfo();



