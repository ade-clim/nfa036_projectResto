import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Field from "../components/forms/Fields";
import categoryApi from "../services/categoryApi";
import productApi from "../services/productApi";
import Select from "../components/forms/Select";

const ProductPage = ({history, match}) => {

    const {id = "new"} = match.params;
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        category: ""
    });

    const [categorys, setCategorys] = useState([]);
    const [errors, setErrors] = useState({
        title: "",
        price: "",
        description: "",
        category: ""
    });

    const [editing, setEditing] = useState(false);

    // Recuperation des categorys
    const fetchCategorys = async () => {
        try {
            const data =  await categoryApi.findAll();
            setCategorys(data);

            if(!product.category) setProduct({...product, category: data[0].id})
        }catch (error) {
            // TODO : Flash notification erreur
            history.replace("/products");
        }
    };

    // Recuperation du produit
    const fetchProduct = async (id) => {
        try {
            const {title, price, description, category} = await productApi.find(id);
            setProduct({title, price, description, category: category.id});
        }catch (error) {
            // TODO : Flash notification erreur
            history.replace("/products");
        }
    };

    // Recuperation de la liste des categorys à chaque chargement de composant
    useEffect(() => {
        fetchCategorys();
    }, []);

    // Recuperation du bon produit dans l'identifiant de l'url change
    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchProduct(id);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setProduct({...product, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(editing){
                await productApi.update(id, product);
                // TODO : Flash notification success
            }else{
                await productApi.create(product);
                console.log(product);
                // TODO : Flash notification success
                history.replace("/products");
            }


        }catch ({response}) {

            const {violations} = response.data;

            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                // TODO : Flash notification de d'erreurs
            }
        }
    };


    return(
        <>
            <div className={"container homecontainer"}>
            {(!editing && <h1>Création d'un produit</h1>) || (<h1>Modification du produit</h1>) }
            <form onSubmit={handleSubmit}>
                <Field name={"title"}
                       placeholder={"Titre du produit"}
                       label={"Titre"}
                       onChange={handleChange}
                       value={product.title}
                       error={errors.title}
                />
                <Field name={"description"}
                       placeholder={"Description du produit"}
                       label={"Description"}
                       onChange={handleChange}
                       value={product.description}
                       error={errors.description}
                />
                <Field name={"price"}
                       placeholder={"Prix du produit"}
                       label={"Prix du produit"}
                       onChange={handleChange}
                       value={product.price}
                       error={errors.price}
                />
                <Select
                    name={"category"}
                    label={"Category"}
                    value={product.category}
                    error={errors.category}
                    onChange={handleChange}
                >
                    {categorys.map(category =>
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    )}

                </Select>
                <div className={"form-group"}>
                    <button className={"btn btn-success"}>Enregistrer</button>
                    <Link to={"/products"} className={"btn btn-link"}>Retour à la liste</Link>
                </div>
            </form>
            </div>
        </>
    )
};

export default ProductPage;