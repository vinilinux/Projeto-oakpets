async function fetchProducts() {
    if (localStorage.getItem("backoffice") === "true") {
        const links = document.querySelectorAll("a");
        for (const link of links) {
            link.disabled = true;
        }
    }
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id'), 10 )

        const response = await fetch(`/products/${id}/details`);
        const products_details = await response.json();

        const carrossel = document.getElementById('carousel-inner');

        if (Array.isArray(products_details.images)) {
            products_details.images.forEach((imagem, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = imagem.imagePath;

                imgElement.classList.add('carousel-item');

                if (imagem.imageDefault === true) {
                    imgElement.classList.add('active');
                }
                carrossel.appendChild(imgElement);
            });
        }

        var rateDouble = products_details.rate;
        var rateInt = Math.floor(rateDouble);
        var decimalPart = rateDouble - rateInt;
        var estrelasContainer = document.getElementById('estrelas-container');
        for (var i = 0; i < rateInt; i++) {
            var img = document.createElement('img');
            img.src = 'Images/icons8-estrela-50-azul.png';
            estrelasContainer.appendChild(img);
        }

        if (decimalPart > 0) {
            var img = document.createElement('img');
            img.src = 'Images/icons8-estrela-meio-vazia-50-azul.png';
            estrelasContainer.appendChild(img);
        }

        const productTitle = document.getElementById("product-name")
        productTitle.textContent = products_details.name;

        const productPrice = document.getElementById("product-price");
        productPrice.textContent = `R$ ${products_details.price.toFixed(2)}`;

        const productDescription = document.getElementById("product-description")
        productDescription.textContent = products_details.description;


        //productCard.appendChild(productImage);

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}



fetchProducts();