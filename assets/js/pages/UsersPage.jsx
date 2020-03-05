import React,{useState, useEffect} from 'react';
import userApi from "../services/userApi";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import verif from "../verifRoles";

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : PAGE AFFICHANT LES INFORMATION DES UTILISATEURS                                                    *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const UsersPage = ({history}) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;



    // Permet de recuperer les users
    const fetchUsers =  async () => {
        try {
            const data = await userApi.findAll();
            setUsers(data);
        }catch (error) {
            console.log(error.response);
        }
    };

    // useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        if(verif !== "ROLE_ADMIN" && verif !== "ROLE_MANAGER"){
            history.replace("/");
        }
        fetchUsers();
    },[]);


    // Supprimer un user en fonction de l'id
    const handleDelete = async (id) => {
        const originalUsers = [...users];
        setUsers(users.filter(user => user.id !== id));
        try {
            await userApi.delete(id);
        }catch (error) {
           setUsers(originalUsers);
        }
    };

    // Gestion du changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };


    // Filtrage des users en fonction de la recherche
    const filteredUsers = users.filter(
        u =>
            u.firstName.toLowerCase().includes(search.toLowerCase()) ||
            u.lastName.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.phone.toLowerCase().includes(search.toLowerCase())
    );


    // Pagination des données
    const paginatedUsers = Pagination.getData(filteredUsers, currentPage, itemsPerPage);

    return(
        <>
            <div className={"container homecontainer"}>
            <h1>Liste des clients</h1>
            <div>
                <input type={"text"} onChange={handleSearch} className={"form-control"} value={search} placeholder={"Rechercher ..."}/>
            </div>
            <table className={"table table-hover"}>
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Tel.</th>
                    <th className={"text-center"}>Commande</th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map(user => <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className={"text-center"}><span className={"badge badge-pill badge-info"}>{user.orders.length}</span></td>
                    <td>
                        <Link to={"/users/" + user.id} className={"mr-4"}><FontAwesomeIcon color={"black"} icon={faEdit} /></Link>
                        <button disabled={user.orders.length > 0} className={" border-0 bg-transparent"} onClick={() => handleDelete(user.id)}><FontAwesomeIcon color={"red"} icon={faTrash} /></button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredUsers.length} onPageChanged={handlePageChange}/>
            </div>
        </>
    )
};

export default UsersPage;