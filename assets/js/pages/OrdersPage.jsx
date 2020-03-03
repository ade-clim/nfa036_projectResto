import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import OrderApi from "../services/OrderApi";
import MyVerticalCenteredModal from "../components/MyVerticallyCenteredModal";
import ModalOrders from "../components/ModalOrders";



const OrdersPage = ({history}) => {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState({
        orderNumber: "",
        dateOrder: "",
        price: "",
        orderDetails: []
    });
    const itemsPerPage = 6;
    const [modalShow, setModalShow] = useState(false);


    // Permet de recuperer les produits
    const fetchOrders = async () => {
        try {
            const data = await OrderApi.findAll();
            setOrders(data);
        }catch (error) {
            console.log(error.response)
        }
    };

    //useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        fetchOrders();
    },[]);


    // Gestion du changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };


    // Filtrage des commandes en fonction de la recherche
    const filteredOrders = orders.filter(
        c =>
            c.price
    );



    // Pagination des données
    const paginatedOrders = Pagination.getData(filteredOrders, currentPage, itemsPerPage);


    return (
        <div className={"container homecontainer"}>
            <div className={"mb-5 d-flex justify-content-between align-items-center"}>
                <h1>Liste des commandes</h1>
            </div>

            <div className={"form-group"}>
                <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/>
            </div>
            <table className={"table table-hover"}>
                <thead>
                <tr>
                    <th>Num. commande</th>
                    <th>Date</th>
                    <th>Total commande</th>
                    <th>Nb. articles</th>
                </tr>
                </thead>
                <tbody>
                {paginatedOrders.map(order =>
                    <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.dateOrder}</td>
                        <td>{order.price.toLocaleString()} euros</td>
                        <td>{order.orderDetails.length}</td>
                        <td><button className={"btn btn-sm btn-info"} onClick={() => {setModalShow(true), setOrder(order)}}>voir</button></td>
                    </tr>
                )}
                </tbody>
            </table>
            <ModalOrders
                show={modalShow}
                onHide={() => setModalShow(false)}
                order={order}
            />
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredOrders.length} onPageChanged={handlePageChange}/>
        </div>
    )
};
export default OrdersPage;