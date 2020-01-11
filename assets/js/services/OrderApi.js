import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/orders")
        .then(response => response.data['hydra:member'])
}

function deleteOrder(id) {
    return axios.delete("https://localhost:8000/api/orders/" + id)
}

function find(id){
    return axios
        .get("https://localhost:8000/api/orders/" + id)
        .then(response => response.data);
}

function update(id, order){
    return axios.put("https://localhost:8000/api/orders/" + id, order);
}

function create(order){
    return axios.post("https://localhost:8000/api/orders", order);
}

export default {
    find,
    findAll,
    update,
    create
}