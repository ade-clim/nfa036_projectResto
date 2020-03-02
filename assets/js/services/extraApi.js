import axios from 'axios';
import {EXTRA_API} from "../config";

function findAll() {
    return axios
        .get(EXTRA_API)
        .then(response => response.data['hydra:member'])
}

function deleteExtra(id) {
    return axios.delete(EXTRA_API + "/" + id)
}

function find(id){
    return axios
        .get(EXTRA_API + "/" + id)
        .then(response => response.data);
}

function update(id, extra){
    return axios.put(EXTRA_API + "/" + id, extra);
}

function create(extra){
    return axios.post(EXTRA_API, extra);
}

export default {
    find,
    delete: deleteExtra,
    findAll,
    update,
    create
}