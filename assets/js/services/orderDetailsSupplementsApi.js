import axios from 'axios';
import {ORDERDETAILSSUPPLEMENTS_API} from "../config";


function findAll() {
    return axios
        .get(ORDERDETAILSSUPPLEMENTS_API)
        .then(response => response.data['hydra:member'])
}

function deleteOrder(id) {
    return axios.delete(ORDERDETAILSSUPPLEMENTS_API + "/" + id)
}

function find(id){
    return axios
        .get(ORDERDETAILSSUPPLEMENTS_API + "/" + id)
        .then(response => response.data);
}

function update(id, order){
    return axios.put(ORDERDETAILSSUPPLEMENTS_API + "/" + id, order);
}

function create(order){
    return axios.post(ORDERDETAILSSUPPLEMENTS_API, {...order, orderDetail: `/api/order_details/${order.orderDetail}`, supplement: `/api/supplements/${order.supplement}`,});
}

export default {
    find,
    findAll,
    update,
    create
}