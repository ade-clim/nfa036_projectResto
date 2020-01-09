import React, {useEffect, useState} from 'react';
import productApi from "../services/productApi";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";

const ProductsPage = (props) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 6;

    // Permet de recuperer les produits
    const fetchProducts = async () => {
        try {
            const data = await productApi.findAll()
            setProducts(data)
        }catch (error) {
            console.log(error.response)
        }
    };
    //useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        fetchProducts()
    },[]);


    // Supprimer un produit en fonction de l'id
    const handleDelete = async (id)=>{
        const originalProducts = [...products];
        setProducts(products.filter(product => product.id !== id))

        try {
            await productApi.delete(id);
        }catch (error) {
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
                <Link className="btn btn-primary" to={"/products/new"}>Créer un produit</Link>
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
                </tr>
                </thead>
                <tbody>
                {paginatedProducts.map(product => <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td width={"25%"}>{product.description}</td>
                    <td>{product.price.toLocaleString()}</td>
                    <td>{product.category.title}</td>
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