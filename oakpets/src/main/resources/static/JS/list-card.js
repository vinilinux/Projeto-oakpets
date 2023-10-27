async function fetchProducts() {
    try {
        const response = await fetch('/products');
        const products = await response.json();

        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        let currentRow;
        let productCount = 0;

        products.forEach((product, index) => {
            if (productCount % 3 === 0) {

                currentRow = document.createElement('div');
                currentRow.classList.add('row');
                productList.appendChild(currentRow);
            }

            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'col-md-4');

            const productImage = document.createElement('img');
            productImage.src = product.images[0].image_path;
            productImage.alt = 'Imagem do Produto';
            productImage.classList.add('img-fluid');

            const productContent = document.createElement('div');
            productContent.classList.add('product-content');

            const productTitle = document.createElement('h2');
            productTitle.classList.add('product-title');
            productTitle.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.classList.add('product-price');
            productPrice.textContent = `R$ ${product.price.toFixed(2)}`;

            const detailsButton = document.createElement('a');
            detailsButton.classList.add('details-button', 'btn', 'btn-primary');
            detailsButton.href = `visualizar-produto.html?id=${product.id_product}`;
            detailsButton.textContent = 'Detalhes';

            productContent.appendChild(productTitle);
            productContent.appendChild(productPrice);
            productContent.appendChild(detailsButton);

            productCard.appendChild(productImage);
            productCard.appendChild(productContent);

            currentRow.appendChild(productCard);

            productCount++;
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function updateUIBasedOnLoginStatus() {
    const userName = localStorage.getItem("userName");
    const userStatusElement = document.getElementById('userStatus');
    const logoutLink = document.getElementById('logoutLink');

    console.log("Valor de userName em localStorage:", localStorage.getItem("userName"));


    if (userName) {
        // Usando uma classe CSS para estilizar
        userStatusElement.classList.add('btnEntrar');
        userStatusElement.innerHTML = `<i class="bi bi-person-fill"></i> <a href="minha-conta.html">${userName}</a>`;
        logoutLink.style.display = 'inline';
    } else {
        // Remover a classe CSS para reverter a estilização
        userStatusElement.classList.remove('btnEntrar');
        userStatusElement.innerHTML = `<a href="./login-cliente.html"><button class="btn btnEntrar text-left" type="submit"><i class="bi bi-person-fill"></i> <span>Entre ou <br> Cadastre-se</span></button></a>`;
        logoutLink.style.display = 'none';
    }
}

updateUIBasedOnLoginStatus();

fetchProducts();