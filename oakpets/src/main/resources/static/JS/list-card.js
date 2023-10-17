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
            productPrice.textContent = `Preço: R$ ${product.price.toFixed(2)}`;

            const detailsButton = document.createElement('a');
            detailsButton.classList.add('details-button', 'btn', 'btn-primary');
            detailsButton.href = `visualizarProduto.html?id=${product.id_product}`;
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

    if (userName) {
        userStatusElement.innerHTML = `<i class="bi bi-person-circle"></i> <a href="perfil-cliente.html">${userName}</a>`;
        logoutLink.style.display = 'inline';
    } else {
        userStatusElement.innerHTML = `<a href="./login-customer.html"><i class="bi bi-person-circle"></i> Entre ou cadastre-se</a>`;
        logoutLink.style.display = 'none';
    }
}


function handleLogout() {
    const confirmation = confirm("Deseja realmente sair?");
    if (confirmation) {
        localStorage.removeItem("userName");
        updateUIBasedOnLoginStatus();
        window.location.href = "./login-customer.html";
    }
}


fetchProducts();
updateUIBasedOnLoginStatus();