import jwt_decode from 'jsonwebtoken';

const tokenPayload = jwt_decode(token); // Use a biblioteca jwt-decode ou outra equivalente
const role = tokenPayload.role; // Substitua "role" pelo nome do campo que contém a role

// Suponha que você tenha definido as roles em uma variável, como "role" no exemplo anterior
if (role === 'ESTOQUE') {
    // Oculte os elementos
    document.querySelector('.nav-item').style.display = 'none'; // Elemento com a classe "nav-item"
    document.querySelector('.btn-danger').style.display = 'none'; // Elemento com a classe "btn-danger"
    document.querySelector('.btn-primary').style.display = 'none'; // Elemento com a classe "btn-primary"
}
