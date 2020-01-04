import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/products")
        .then(response => response.data['hydra:member'])
}

function deleteProduct(id) {
    return axios.delete("https://localhost:8000/api/products/" + id)
}

function find(id){
    return axios
        .get("https://localhost:8000/api/products/" + id)
        .then(response => response.data);
}

function update(id, product){
    return axios.put("https://localhost:8000/api/products/" + id, {...product, category: `/api/categories/${product.category}`});
}

function create(product){
    return axios.post("https://localhost:8000/api/products", {...product, category: `/api/categories/${product.category}`});
}

export default {
    findAll,
    delete : deleteProduct,
    find,
    update,
    create
}