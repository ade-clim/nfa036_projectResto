import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import categoryApi from "../services/categoryApi";
import {Link} from "react-router-dom";
import verif from "../verifRoles";

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : PAGE AFFICHANT LES CATEGORIES                                                                            *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CategoriesPage = ({history}) => {

    const [categorys, setCategorys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;


    // Permet de recuperer les categories
    const fetchCategorys = async () => {
        try {
            const data = await categoryApi.findAll();
            setCategorys(data);
        }catch (error) {
            console.log(error.response);
        }
    };


    // useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        if(verif !== "ROLE_ADMIN" && verif !== "ROLE_MANAGER"){
            history.replace("/");
        }
        fetchCategorys();
    },[]);


    // Supprimer une categorie en fonction de l'id
    const handleDelete = async (id)=>{
        const originalCategorys = [...categorys];
        setCategorys(categorys.filter(category => category.id !== id));

        try {
            await categoryApi.delete(id);
        }catch (error) {
            setCategorys(originalCategorys);
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
    const filteredCategorys = categorys.filter(
        c =>
            c.title.toLowerCase().includes(search.toLowerCase())
            );

    // Pagination des données
    const paginatedCategorys = Pagination.getData(filteredCategorys, currentPage, itemsPerPage);



    return(
        <>
            <div className={"container homecontainer"}>
            <div className={"mb-5 d-flex justify-content-between align-items-center"}>
                <h1>Liste des catégories</h1>
                <Link to={"/categorys/new"} className={"btn btn-primary"} >Créer une catégorie</Link>
            </div>
            <div className={"form-group"}>
                <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/>
            </div>
            <table className={"table table-hover"}>
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Title</th>
                    <th className={"text-center"}>Produits</th>
                </tr>
                </thead>
                <tbody>
                {paginatedCategorys.map(category => <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.title}</td>
                    <td className={"text-center"}><Link to={"/products/"+ category.id} className={"badge badge-pill badge-info"}>{category.products.length}</Link></td>

                    <td>
                        <Link  to={"/categorys/" + category.id} className={"btn btn-sm btn-primary mr-1"}>Editer</Link>
                        <button disabled={category.products.length > 0} className={"btn btn-sm btn-danger"} onClick={() => handleDelete(category.id)}>supprimer</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCategorys.length} onPageChanged={handlePageChange}/>
            </div>
        </>
    )
}

export default CategoriesPage;