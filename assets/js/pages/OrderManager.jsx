import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import OrderApi from "../services/OrderApi";
import {toast} from "react-toastify";


const OrderManager = () => {

    const [orders, setOders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 5;

    const fetchOrders= async() => {
        try {
            const data = await OrderApi.findAll();
            setOders(data)
        }catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchOrders()
    },[orders]);


    // Gestion du changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    // Filtrage des categories en fonction de la recherche
    const filteredOrders = orders.filter(
        c =>
            c.dateOrder.toLowerCase().includes(search.toLowerCase()) ||
            c.price.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination des données
    const paginatedOrders = Pagination.getData(filteredOrders, currentPage, itemsPerPage);

    // Gestion des changements de statut pour la commande
    const handleChange = async ({currentTarget, target}) => {
        const value = currentTarget.value;
        const idOrder = currentTarget.id;
        try {

            const order = await OrderApi.find(idOrder);
            await OrderApi.update(idOrder, {...order, statut: value});
            toast.success("🍔 Statut modifier!");
        }catch (error) {
            toast.error("🍔 Erreur lors de la modification!");
            console.log(error)
        }

    };

    return(
        <div className={"container homecontainer"}>
            <div className={"mb-5 d-flex justify-content-between align-items-center"}>
                <h1>Liste des commandes</h1>
            </div>
            <div className={"form-group"}>
                <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/>
            </div>

            <table className={"table table-hover table-sm"}>
                <thead>
                <tr>
                    <th>Num.</th>
                    <th>Date</th>
                    <th className={"text-center"}>Prix</th>
                    <th>Statut</th>
                </tr>
                </thead>
                <tbody>
                {paginatedOrders.map(order =>
                    <>
                        {order.statut === "Commande validée" &&
                        <tr key={order.id} className={"table-success"}>
                            <td>#{order.orderNumber}</td>
                            <td>{order.dateOrder}</td>
                            <td className={"text-center"}>{order.price} euros</td>

                            <td>
                                <select onChange={handleChange} className={"custom-select my-1 mr-sm-2"} id={order.id}>
                                    <option value={order.statut}>
                                        {order.statut}
                                    </option>
                                    {order.statut === "Commande validée" &&
                                    <>
                                        <option value={"En cours de préparation"}>
                                            En cours de préparation
                                        </option>
                                    </>
                                    ||
                                    <option value={"Commande validée"}>
                                        Commande validée
                                    </option>
                                    }

                                </select>
                            </td>
                        </tr>
                        ||
                        <tr key={order.id}>
                            <td>#{order.orderNumber}</td>
                            <td>{order.dateOrder}</td>
                            <td className={"text-center"}>{order.price} euros</td>

                            <td>
                                <select onChange={handleChange} className={"custom-select my-1 mr-sm-2"} id={order.id}>
                                    <option value={order.statut}>
                                        {order.statut}
                                    </option>
                                    {order.statut === "Commande validée" &&
                                    <>
                                        <option value={"En cours de préparation"}>
                                            En cours de préparation
                                        </option>
                                    </>
                                    ||
                                    <option value={"Commande validée"}>
                                        Commande validée
                                    </option>
                                    }


                                </select>
                            </td>

                        </tr>
                        }

                        <table className={"table table-hover table-sm table-warning"}>
                            <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Suppléments</th>
                                <th>Quantité</th>

                            </tr>
                            </thead>
                            <tbody>
                            {order.orderDetails.map(product =>
                                <>
                                    <tr key={product.id}>
                                        <td>{product.products.title}</td>
                                        <td>
                                            {product.orderdetailsSupplements.map(supp =>
                                            <span className={"ml-1"}>
                                                {supp.supplement.title}
                                            </span>
                                            )}
                                        </td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                </>)}
                            </tbody>
                        </table>
                    </>
                )}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredOrders.length} onPageChanged={handlePageChange}/>
        </div>
    )
};

export default OrderManager;