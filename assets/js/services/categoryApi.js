import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/categories")
        .then(response => response.data['hydra:member'])
}

function deleteCategory(id) {
    return axios.delete("https://localhost:8000/api/categories/" + id)
}

function find(id){
    return axios
        .get("https://localhost:8000/api/categories/" + id)
        .then(response => response.data);
}

function update(id, category){
    return axios.put("https://localhost:8000/api/categories/" + id, category);
}

function create(category){
    return axios.post("https://localhost:8000/api/categories", category);
}


export default {
    findAll,
    delete : deleteCategory,
    find,
    update,
    create
}