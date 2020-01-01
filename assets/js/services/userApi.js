import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/users")
        .then(response => response.data['hydra:member']);
}

function deleteUser(id){
    return axios.delete("https://localhost:8000/api/users/" + id);
}

export default {
    findAll,
    delete : deleteUser
}