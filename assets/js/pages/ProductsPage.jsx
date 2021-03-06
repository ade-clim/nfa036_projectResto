import React, {useEffect, useState} from 'react';
import productApi from "../services/productApi";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
import verif from "../verifRoles";
import {toast} from "react-toastify";

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : PAGE AFFICHANT LES INFORMATION DES PRODUITS PAR ID                                                       *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ProductsPage = ({history}) => {
    const [products, setProducts] = useState([]);
    const [extras, setExtras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 6;

    // Permet de recuperer les extras
    const fetchExtras = async () => {
        try {
            //const data = await extraProductApi.findAll();
            //setExtras(data);
        }catch (error) {
            console.log(error.response)
        }
    };


    // Permet de recuperer les produits
    const fetchProducts = async () => {
        try {
            const data = await productApi.findAll();
            setProducts(data);

            // on recupere la liste des extraproducts pour afficher leur nombres par produit


        }catch (error) {
            console.log(error.response)
        }
    };

    //useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        if(verif !== "ROLE_ADMIN" && verif !== "ROLE_MANAGER"){
            history.replace("/");
        }
        fetchProducts();
        fetchExtras();
    },[]);


    // Supprimer un produit en fonction de l'id
    const handleDelete = async (id)=>{
        const originalProducts = [...products];
        setProducts(products.filter(product => product.id !== id));

        try {
            await productApi.delete(id);
            toast.success("🍔 Produit supprimer!");
        }catch (error) {
            toast.success("🍔 erreur lors de la suppression!");
            setProducts(originalProducts);
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

    // Filtrage des produits en fonction de la recherche
    const filteredProducts = products.filter(
        c =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase()) ||
            c.category.title.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination des données
    const paginatedProducts = Pagination.getData(filteredProducts, currentPage, itemsPerPage);


    return(
        <>
            <div className={"container homecontainer"}>
                <div className={"mb-5 d-flex justify-content-between align-items-center"}>
                    <h1>Liste des produits</h1>
                    <Link className="btn btn-primary"
                          to={{pathname:"/products/new", state: {idlast:"5"}}} >Créer un produit</Link>
                </div>

                <div className={"form-group"}>
                    <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/>
                </div>
                <table className={"table table-hover"}>
                    <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Catégorie</th>
                        <th>Extras</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedProducts.map(product => <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td width={"25%"}>{product.description}</td>
                        <td>{product.price.toLocaleString()}</td>
                        <td>{product.category.title}</td>
                        <td><span className={"badge badge-pill badge-info"}>{product.productExtras.length}</span></td>
                        <td>
                            <Link to={"/products/" + product.id} className={"btn btn-sm btn-primary mr-1"}>Editer </Link>
                            <button className={"btn btn-sm btn-danger"} onClick={() => handleDelete(product.id)}>Supprimer</button>
                        </td>

                    </tr>)}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredProducts.length} onPageChanged={handlePageChange}/>
            </div>
        </>
    )
}


export default ProductsPage;
