async function fetchProducts() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id'), 10)

        const response = await fetch(`/products/${id}/details`);
        const products_details = await response.json();

        const carrossel = document.getElementById('carousel-inner');

        if (Array.isArray(products_details.images)) {
            products_details.images.forEach((imagem, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = imagem.image_path;

                imgElement.classList.add('carousel-item');

                if (imagem.image_default === 'yes' && index === 0) {
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
            img.src = 'Images/icons8-estrela-50.png';
            estrelasContainer.appendChild(img);
        }

        if (decimalPart > 0) {
            var img = document.createElement('img');
            img.src = 'Images/icons8-estrela-meio-vazia-50.png';
            estrelasContainer.appendChild(img);
        }

        const productTitle = document.getElementById("product-name")
        productTitle.textContent = products_details.name;

        const productPrice = document.getElementById("product-price");
        productPrice.textContent = `Preço: R$ ${products_details.price.toFixed(2)}`;

        const productDescription = document.getElementById("product-description")
        productDescription.textContent = products_details.description;


        //productCard.appendChild(productImage);

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

fetchProducts();

/*
<script>
    var rateDouble = ${product.rate};
    var rateInt = Math.floor(rateDouble);
    var decimalPart = rateDouble - rateInt;
    var estrelasContainer = document.getElementById('estrelas-container');
    for (var i = 0; i < rateInt; i++) {
    var img = document.createElement('img');
    img.src = 'Images/icons8-estrela-50.png';
    estrelasContainer.appendChild(img);
}

    if (decimalPart > 0) {
    var img = document.createElement('img');
    img.src = 'Images/icons8-estrela-meio-vazia-50.png';
    estrelasContainer.appendChild(img);
}

</script>

 */