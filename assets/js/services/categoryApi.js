import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/categories")
        .then(response => response.data['hydra:member'])
}

function deleteCategory(id) {
    return axios.delete("https://localhost:8000/api/categories/" + id)
}

export default {
    findAll,
    delete : deleteCategory
}