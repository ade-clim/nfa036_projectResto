import axios from 'axios';
import {SUPPLEMENT_API} from "../config";

function findAll() {
    return axios
        .get(SUPPLEMENT_API)
        .then(response => response.data['hydra:member'])
}

function deleteProduct(id) {
    return axios.delete(SUPPLEMENT_API + "/" + id)
}

function find(id){
    return axios
        .get(SUPPLEMENT_API + "/" + id)
        .then(response => response.data);
}


function update(id, supplement){
    return axios.put(SUPPLEMENT_API + "/" + id, {...supplement});
}

function create(supplement){
    return axios.post(SUPPLEMENT_API, {...supplement});
}

export default {
    findAll,
    delete : deleteProduct,
    find,
    update,
    create
}