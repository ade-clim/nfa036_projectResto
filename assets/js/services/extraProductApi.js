import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/product_extras")
        .then(response => response.data['hydra:member'])
}

function deleteProductExtra(id) {
    return axios.delete("https://localhost:8000/api/product_extras/" + id)
}

function find(id){
    return axios
        .get("https://localhost:8000/api/product_extras/", id)
        .then(response => response.data);
}

function findExtrasByProduct(product){
    return axios
        .get("https://localhost:8000/api/product_extras/")
        .then(response => response.data['hydra:member']);
}


function update(id, productExtra){
    return axios.put("https://localhost:8000/api/product_extras/" + id, productExtra);
}

function create(productExtra){
    return axios.post("https://localhost:8000/api/product_extras", {...productExtra, extra:`/api/extras/${productExtra.extra}`, product: `/api/products/${productExtra.product}`});
}

export default {
    find,
    deleteProductExtra,
    findExtrasByProduct,
    findAll,
    update,
    create
}