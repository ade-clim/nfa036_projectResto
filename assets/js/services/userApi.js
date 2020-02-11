import axios from 'axios';
import {USERS_API} from "../config";


function findAll() {
    return axios
        .get(USERS_API)
        .then(response => response.data['hydra:member']);
}

function deleteUser(id){
    return axios.delete(USERS_API + "/" + id);
}

function find(id){
    return axios
        .get(USERS_API + "/" + id)
        .then(response => response.data);
}

function update(id, user){
    return axios.put(USERS_API + "/" + id, user);
}

function create(user){
    return axios.post(USERS_API, user);
}

export default {
    findAll,
    delete : deleteUser,
    find,
    update
}