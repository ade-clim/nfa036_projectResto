import axios from 'axios';
import {ADDRESSDELIVERY_API} from "../config";

function findAll() {
    return axios
        .get(ADDRESSDELIVERY_API)
        .then(response => response.data['hydra:member'])
}

function deleteAddress(id) {
    return axios.delete(ADDRESSDELIVERY_API + "/" + id)
}

function find(id){
    return axios
        .get(ADDRESSDELIVERY_API + "/" + id)
        .then(response => response.data);
}

function update(id, address){
    return axios.put(ADDRESSDELIVERY_API + "/" + id, address);
}

function create(address){
    return axios.post(ADDRESSDELIVERY_API, address);
}

export default {
    create,
    findAll,
    deleteAddress,
    find,
    update
}