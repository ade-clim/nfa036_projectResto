import React, {useState, useEffect} from 'react';
import supplementApi from "../services/supplementApi";
import {Link} from "react-router-dom";
import Pagination from "../components/Pagination";
import extraApi from "../services/extraApi";



const SupplementsPage = () => {

    const [supplements, setSupplements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 5;

    const fetchSupplement = async () => {
        const data = await supplementApi.findAll();
        setSupplements(data);
    };


    useEffect(() => {
        fetchSupplement();
    },[]);


    // Supprimer un supplement en fonction de l'id
    const handleDelete = async (id)=>{
        const originalSupplements = [...supplements];
        setSupplements(supplements.filter(supp => supp.id !== id));

        try {
            await supplementApi.delete(id);
        }catch (error) {
            setSupplements(originalSupplements);
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
    const filteredSupplements = supplements.filter(
        c =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination des données
    const paginatedSupplements = Pagination.getData(filteredSupplements, currentPage, itemsPerPage);

    return(
        <div className={"container homecontainer"}>
            <div className={"mb-5 d-flex justify-content-between align-items-center"}>
                <h1>Liste des suppléments</h1>
                <Link to={"/supplements/new"} className={"btn btn-primary"} >Créer un supplément</Link>
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
                    <th className={"text-center"}>Prix</th>
                </tr>
                </thead>
                <tbody>
                {paginatedSupplements.map(supplement => <tr key={supplement.id}>
                    <td>{supplement.id}</td>
                    <td>{supplement.title}</td>
                    <td>{supplement.description}</td>
                    <td className={"text-center"}>{supplement.price}</td>

                    <td>
                        <Link  to={"/supplements/" + supplement.id} className={"btn btn-sm btn-primary mr-1"}>Editer</Link>
                        <button className={"btn btn-sm btn-danger"} onClick={() => handleDelete(supplement.id)}>supprimer</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredSupplements.length} onPageChanged={handlePageChange}/>
        </div>

    )
};

export default SupplementsPage;