const urlParams = new URLSearchParams(window.location.search);
const idProduct = parseInt(urlParams.get('id'), 10);

if(urlParams != 0) {
    window.addEventListener('load', editarProduct);

}

async function editarProduct() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams)

        const response = await fetch(`http://localhost:8080/products/${idProduct}/details`);
        const product_details = await response.json();

        console.log(product_details)

        document.querySelector("#productName").value = product_details.name;
        document.querySelector("#productPrice").value = product_details.price;
        document.querySelector("#productQTD").value = product_details.amount;
        document.querySelector("#productDescription").value = product_details.description;
        document.querySelector("#productRate").value = product_details.rate;

        displayImages(product_details.images);


    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }
}

function redirecionarParaListar() {
    window.location.href = 'produtos.html';
}

const formData = new FormData();

function salvar() {

    const data = {
        idProduct : idProduct,
        name: document.querySelector("#productName").value,
        rate: document.querySelector("#productRate").value,
        description: document.querySelector("#productDescription").value,
        price : document.querySelector("#productPrice").value,
        amount: document.querySelector("#productQTD").value,
    }

    formData.append("data", JSON.stringify(data));

    var inputImages = document.getElementById("formFile");

    if (inputImages.files.length > 0) {
        for (var i = 0; i < inputImages.files.length; i++) {
            formData.append("files", inputImages.files[i]);
        }
    }


    console.log(urlParams)

    if(urlParams != 0) {
        
        fetch(`http://localhost:8080/products/update`, {
            method: 'PUT',
            body: formData
        }).then(function (response) {
            if (response.status === 200) {
                alert("Produto alterado com sucesso!")
                window.location.href = "produtos.html";
            }
    
            if(response.status === 400) {
                alert("Falha ao alterar produto")
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar: ", error);
        });          
    
    } else {
        fetch("http://localhost:8080/products/create", {
            method: 'POST',
            body: formData
        }).then(function (response) {
            if (response.status === 201) {
                window.location.href = "produtos.html";
            }
    
            if(response.status === 400) {
                alert("Produto já cadastrado")
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar: ", error);
        });
    }

}

function handleFiles(files) {
    const thumbnailsDiv = document.getElementById("thumbnails");

    // Limpa a área de miniaturas
    thumbnailsDiv.innerHTML = "";

    // Loop através das imagens carregadas
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const thumbnail = document.createElement("div");
      thumbnail.className = "col-3";

      // Cria um elemento de imagem
      const image = document.createElement("img");
      image.className = "img-thumbnail imgthumbnail";
      image.src = URL.createObjectURL(file);
      console.log(file.name)

      image.onclick = function () {
        image.classList.add("destaque");
        formData.append("imageDefault", file.name)
      }

      thumbnail.appendChild(image);

      // Adiciona a miniatura à área de miniaturas
      thumbnailsDiv.appendChild(thumbnail);
    }
  }

function displayImages(imagePaths) {
    const thumbnailsDiv = document.getElementById("thumbnails-antigas");

    thumbnailsDiv.innerHTML = "";

    for (let i = 0; i < imagePaths.length; i++) {
        const imagePath = imagePaths[i];

        const thumbnail = document.createElement("div");
        thumbnail.className = "image-container col-3"; // Adicione as classes "image-container" e "col-3" do Bootstrap

        const image = document.createElement("img");
        image.className = "img-thumbnail"; // Adicione a classe "img-thumbnail" do Bootstrap
        image.src = imagePath;

        const deleteIcon = document.createElement("a");
        deleteIcon.className = "text-danger"; // Adicione a classe "text-danger" para a cor vermelha do Bootstrap
        deleteIcon.href = "javascript:void(0)"; // Defina um link vazio para tornar o ícone clicável
        deleteIcon.innerHTML = "&times;"; // Adicione o símbolo "x"

        deleteIcon.addEventListener('click', () => {
            // Capturar o ID da imagem quando o "x" for clicado
            // Para obter o ID da imagem, você pode usar um atributo personalizado no elemento "thumbnail"
            const imageId = thumbnail.getAttribute("data-image-id");
            formData.append("idImage", imageId);
            console.log('ID da imagem selecionada:', imageId);
        });

        // Defina o atributo personalizado "data-image-id" com o ID da imagem
        thumbnail.setAttribute("data-image-id", imagePath.idImage);

        thumbnail.appendChild(image);
        thumbnail.appendChild(deleteIcon);

        thumbnailsDiv.appendChild(thumbnail);
    }
}



