import axios from 'axios';
import {CATEGORY_API} from "../config";
function findAll() {
    return axios
        .get(CATEGORY_API)
        .then(response => response.data['hydra:member'])
}

function deleteCategory(id) {
    return axios.delete(CATEGORY_API + "/" + id)
}

function find(id){
    return axios
        .get(CATEGORY_API + "/" + id)
        .then(response => response.data);
}

function update(id, category){
    return axios.put(CATEGORY_API + "/" + id, category);
}

function create(category){
    return axios.post(CATEGORY_API, category);
}


export default {
    findAll,
    deleteCategory,
    find,
    update,
    create
}