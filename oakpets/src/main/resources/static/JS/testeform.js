token = localStorage.getItem('token');
const form = document.querySelector("form");

const productData = {
    name: form.querySelector("#productName").value,
    description: form.querySelector("#productDescription").value,
    price: form.querySelector("#productPrice").value,
    amount: form.querySelector("#productQTD").value,
    rate : form.querySelector("#rate").value
};

const images = [];

const inputImages = document.querySelectorAll("input[type='file']");

for (const inputImage of inputImages) {
    if (inputImage.files.length > 0) {
        images.push(inputImage.files[0]);
    }
}

const formData = new FormData();

formData.append("data", JSON.stringify(productData));

for (const image of images) {
    formData.append("images", image);
}

fetch("/products/create", {
    method: "POST",
    body: formData,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    }
})
    .then((response) => {
        if (response.ok) {
            alert("salva")
        } else {
            alert("falha")
        }
    })
    .catch((error) => {
        // Error
    });
