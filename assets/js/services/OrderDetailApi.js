import axios from 'axios';
import {ORDERDETAILS_API} from "../config";


function findAll() {
    return axios
        .get(ORDERDETAILS_API)
        .then(response => response.data['hydra:member'])
}

function deleteOrder(id) {
    return axios.delete(ORDERDETAILS_API + "/" + id)
}

function find(id){
    return axios
        .get(ORDERDETAILS_API + "/" + id)
        .then(response => response.data);
}

function update(id, order){
    return axios.put(ORDERDETAILS_API + "/" + id, order);
}

function create(order){
    return axios.post(ORDERDETAILS_API, {...order, products: `/api/products/${order.productsId}`, orders: `/api/orders/${order.ordersId}`,});
}

export default {
    find,
    findAll,
    update,
    create
}