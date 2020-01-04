import axios from 'axios';

function createAddress(address){
    return axios.post("https://localhost:8000/adresses", address);
}

export default {
    createAddress
}