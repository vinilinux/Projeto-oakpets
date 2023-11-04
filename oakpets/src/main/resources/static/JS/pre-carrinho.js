document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const total = urlParams.get("total");
    const productName = urlParams.get("productName");
    const productDescription = urlParams.get("productDescription");
    const productPrice = urlParams.get("productPrice");
    const productImage = urlParams.get("productImage");

    // Atualize os elementos no DOM com as informações da URL
    document.getElementById("totalCompra").textContent = `Total da Compra: R$ ${total}`;
    document.getElementById("product-name").textContent = productName;
    document.getElementById("product-description").textContent = productDescription;
    document.getElementById("product-price").textContent = `R$ ${productPrice}`;

    // Atualize o elemento de imagem
    document.getElementById("product-image").src = productImage;

    const url = `./carrinho.html?total=${total}&productName=${productName}&productDescription=${productDescription}&productPrice=${productPrice}&productImage=${productImage}`;

    document.getElementById("botao1").addEventListener("click", function () {
        window.location.href = "./list-card.html";
    });

    document.getElementById("botao2").addEventListener("click", function () {
        window.location.href = url;
    });
});
