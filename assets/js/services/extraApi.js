import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/extras")
        .then(response => response.data['hydra:member'])
}

function deleteExtra(id) {
    return axios.delete("https://localhost:8000/api/extras/" + id)
}

function find(id){
    return axios
        .get("https://localhost:8000/api/extras/" + id)
        .then(response => response.data);
}

function update(id, extra){
    return axios.put("https://localhost:8000/api/extras/" + id, extra);
}

function create(extra){
    return axios.post("https://localhost:8000/api/extras", extra);
}

export default {
    find,
    deleteExtra,
    findAll,
    update,
    create
}