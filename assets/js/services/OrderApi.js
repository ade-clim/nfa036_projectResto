import axios from 'axios';
import {ORDER_API} from "../config";


function findAll() {
    return axios
        .get(ORDER_API)
        .then(response => response.data['hydra:member'])
}

function deleteOrder(id) {
    return axios.delete(ORDER_API + "/" + id)
}

function find(id){
    return axios
        .get(ORDER_API + "/" + id)
        .then(response => response.data);
}

function update(id, order){
    return axios.put(ORDER_API + "/" + id, order);
}

function create(order){
    return axios.post(ORDER_API, {...order, addressDelivery: `/api/address_deliveries/${order.addressDelivery}`});
}

export default {
    find,
    findAll,
    update,
    create
}