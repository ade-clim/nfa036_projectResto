import axios from 'axios';
import {EXTRAPRODUCT_API} from "../config";

function findAll() {
    return axios
        .get(EXTRAPRODUCT_API)
        .then(response => response.data['hydra:member'])
}

function deleteProductExtra(id) {
    return axios.delete(EXTRAPRODUCT_API + "/" + id)
}

function find(id){
    return axios
        .get(EXTRAPRODUCT_API + "/" + id)
        .then(response => response.data);
}

function findExtrasByProduct(product){
    return axios
        .get(EXTRAPRODUCT_API)
        .then(response => response.data['hydra:member']);
}


function update(id, productExtra){
    return axios.put(EXTRAPRODUCT_API + "/" + id, {...productExtra, extra:`/api/extras/${productExtra.extra}`, product: `/api/products/${productExtra.product}`});
}

function create(productExtra){
    return axios.post(EXTRAPRODUCT_API, {...productExtra, extra:`/api/extras/${productExtra.extra}`, product: `/api/products/${productExtra.product}`});
}

export default {
    find,
    deleteProductExtra,
    findExtrasByProduct,
    findAll,
    update,
    create
}