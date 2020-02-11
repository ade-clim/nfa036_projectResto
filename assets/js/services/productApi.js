import axios from 'axios';
import {PRODUCT_API} from "../config";

function findAll() {
    return axios
        .get(PRODUCT_API)
        .then(response => response.data['hydra:member'])
}

function deleteProduct(id) {
    return axios.delete(PRODUCT_API + "/" + id)
}

function find(id){
    return axios
        .get(PRODUCT_API + "/" + id)
        .then(response => response.data);
}

function findByCategory(id){
    return axios
        .get(PRODUCT_API + "/" + id)
        .then(response => response.data);
}


function update(id, product){
    return axios.put(PRODUCT_API + "/" + id, {...product, category: `/api/categories/${product.category}`});
}

function create(product){
    return axios.post(PRODUCT_API, {...product, category: `/api/categories/${product.category}`});
}

export default {
    findAll,
    delete : deleteProduct,
    find,
    update,
    create
}