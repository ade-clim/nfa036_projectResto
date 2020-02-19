import axios from 'axios';
import {EXTRASUPPLEMENT_API} from "../config";

function findAll() {
    return axios
        .get(EXTRASUPPLEMENT_API)
        .then(response => response.data['hydra:member'])
}

function deleteProductExtra(id) {
    return axios.delete(EXTRASUPPLEMENT_API + "/" + id)
}

function find(id){
    return axios
        .get(EXTRASUPPLEMENT_API + "/" + id)
        .then(response => response.data);
}

function findExtrasByProduct(product){
    return axios
        .get(EXTRASUPPLEMENT_API)
        .then(response => response.data['hydra:member']);
}


function update(id, extraSupplement){
    return axios.put(EXTRASUPPLEMENT_API + "/" + id, {...extraSupplement, extra:`/api/extras/${productExtra.extra}`, product: `/api/products/${productExtra.product}`});
}

function create(extraSupplement){
    return axios.post(EXTRASUPPLEMENT_API, {...extraSupplement, supplement: `/api/supplements/${extraSupplement.supplement}`, extra:`/api/extras/${extraSupplement.extra}`});
}

export default {
    find,
    deleteProductExtra,
    findExtrasByProduct,
    findAll,
    update,
    create
}