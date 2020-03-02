import React, {useEffect, useState} from 'react'
import categoryApi from "../services/categoryApi";
import Pagination from "../components/Pagination";
import extraApi from "../services/extraApi";
import {Link} from "react-router-dom";

const ExtrasPage = (props) => {

    const [extras, setExtras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 5;


    // Permet de recuperer les extras
    const fetchExtras = async () => {
        try {
            const data = await extraApi.findAll();
            setExtras(data);
        }catch (error) {
            console.log(error.response);
        }
    };


    // useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        fetchExtras();
    },[]);


    // Supprimer un extra en fonction de l'id
    const handleDelete = async (id)=>{
        console.log(id)
        const originalExtras = [...extras];
        setExtras(extras.filter(extra => extra.id !== id));

        try {
            await extraApi.delete(id);
        }catch (error) {
            setExtras(originalExtras);
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

    // Filtrage des categories en fonction de la recherche
    const filteredExtras = extras.filter(
        c =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination des données
    const paginatedExtras = Pagination.getData(filteredExtras, currentPage, itemsPerPage);



    return(
        <div className={"container homecontainer"}>
            <div className={"mb-5 d-flex justify-content-between align-items-center"}>
                <h1>Liste des extras</h1>
                <Link to={"/extras/new"} className={"btn btn-primary"} >Créer un extra</Link>
            </div>
            <div className={"form-group"}>
                <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/>
            </div>
            <table className={"table table-hover"}>
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th className={"text-center"}>Supplements</th>
                </tr>
                </thead>
                <tbody>
                {paginatedExtras.map(extra => <tr key={extra.id}>
                    <td>{extra.id}</td>
                    <td>{extra.title}</td>
                    <td>{extra.description}</td>
                    <td className={"text-center "}><span className={"badge badge-pill badge-info"}>{extra.supplement.length}</span></td>

                    <td>
                        <Link  to={"/extras/" + extra.id} className={"btn btn-sm btn-primary mr-1"}>Editer</Link>
                        <button className={"btn btn-sm btn-danger"} onClick={() => handleDelete(extra.id)}>supprimer</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredExtras.length} onPageChanged={handlePageChange}/>
        </div>
    )
};

export default ExtrasPage;