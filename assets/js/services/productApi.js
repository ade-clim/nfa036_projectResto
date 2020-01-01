import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/products")
        .then(response => response.data['hydra:member'])
}

function deleteProduct(id) {
    return axios.delete("https://localhost:8000/api/products/" + id)
}

export default {
    findAll,
    delete : deleteProduct
}