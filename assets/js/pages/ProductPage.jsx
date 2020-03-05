import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Field from "../components/forms/Fields";
import categoryApi from "../services/categoryApi";
import productApi from "../services/productApi";
import Select from "../components/forms/Select";
import extraApi from "../services/extraApi";
import extraProductApi from "../services/extraProductApi";
import verif from "../verifRoles";


/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : PAGE AFFICHANT LES INFORMATION D'UNE PRODUIT PAR ID                                                      *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const ProductPage = ({history, match}) => {

    const {id = "new"} = match.params;
    const [idLastProduct, setIdLastProduct] = useState();
    const [extras, setExtras] = useState([]);
    const [optionsChecked, setOptionChecked] = useState([]);

    const [extrasByProduct, setExtrasByProduct] = useState([]);

    const [productsExtrasAll, setProductsExtrasAll] = useState([]);
    const [productExtra, setProductExtra] = useState({
        extra: "",
        product: ""
    });

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




    //Recuperation des extras disponible
    const fetchExtras = async () => {
        try {
            const data = await extraApi.findAll();
            setExtras(data);

        }catch (error) {
            // TODO : Flash notification erreur
            history.replace("/products");
        }
    };



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
            console.log(error.response);
            history.replace("/products");
        }
    };

    // Recuperation des extras par produit
    const fetchExtrasByProduct = async (idProduit) => {
        try {
            const data = await extraProductApi.findAll();
            // On stock les extras qui appartiennent au produit en cours d'editions
            const value = data.filter(l => l.product.id == idProduit);
            setExtrasByProduct(value);


        }catch (error) {
            // TODO : Flash notification erreur
            history.replace("/products");
        }
    };

    // on recupere les productExtra du produit en base de donnée
    const fetchProductsExtras = async() => {
      const data = await extraProductApi.findAll();
      const dataFilter = data.filter(t => t.product.id == id);
      setProductsExtrasAll(dataFilter);
    };

    // Recuperation de la liste des categorys à chaque chargement de composant
    useEffect(() => {
        if(verif !== "ROLE_ADMIN" && verif !== "ROLE_MANAGER"){
            history.replace("/");
        }
        fetchProducts();
        fetchCategorys();
        fetchExtras();
        fetchProductsExtras();
    }, []);


    // Recuperation du bon produit et de ces extras dans l'identifiant de l'url change
    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchProduct(id);
            fetchExtrasByProduct(id);
        }
    }, [id]);



    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setProduct({...product, [name]: value});
    };


    // Permet de recuperer la derniere id du produit enregistrer en base de donnée
    const fetchProducts = async () => {
        try {
            const data = await productApi.findAll();
            setIdLastProduct(data[0]);

        }catch (error) {
            console.log(error.response)
        }
    };

    const lastProductCreate= async (id) => {

        // Recup les value des case du checkbox cocher
        const el = document.getElementById('myCheck');
        const productsExtras = el.getElementsByTagName('input');

        for (let i = 0; i < productsExtras.length; i++) {
            if (productsExtras[i].type === 'checkbox' && productsExtras[i].checked === true) {
                const value = extras.filter(f => f.title === productsExtras[i].value);
                const ExtraProduct = {extra: value[0].id, product: id};
                await extraProductApi.create(ExtraProduct);
            }
        }

    };

    //
    const lastProductEditing = async () => {
        const tabDelete = [...extrasByProduct];

        // Recup les value des case du checkbox cocher
        const el = document.getElementById('myCheck');
        const productsExtras = el.getElementsByTagName('input');

        for (let i = 0; i < productsExtras.length; i++) {
            let verifExtraBdd = false;
            if (productsExtras[i].type === 'checkbox' && productsExtras[i].checked === true) {
                for(let p = 0; p < extrasByProduct.length; p++){
                    // on verifie si le produit en base de donnée == au produit cocher
                    if(productsExtras[i].id == extrasByProduct[p].extra.id){
                        verifExtraBdd = true;
                    }
                }
                // si le produit n'est pas en bdd on creer l'extra product
                if(!verifExtraBdd){
                    const value = extras.filter(f => f.title === productsExtras[i].value);
                    const ExtraProduct = {extra: value[0].id, product: id};
                    await extraProductApi.create(ExtraProduct);
                }

            }else{
                if(productsExtras[i].type === 'checkbox'){

                    for(let p = 0 ; p < tabDelete.length; p++){
                        if(tabDelete[p].extra.id == productsExtras[i].id){
                            await extraProductApi.deleteProductExtra(tabDelete[p].id)
                        }
                    }
                }

            }

        }
    };


    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            if(editing){
                await productApi.update(id, product);
                lastProductEditing();

                // TODO : Flash notification success
            }else{
                const data = await productApi.create(product);

                // on envoie l'id du produit qui viens d'etre créer
                lastProductCreate(data.data.id);

                // TODO : Flash notification success
                setProduct({
                    title: "",
                    price: "",
                    description: "",
                    category: ""
                });

                history.replace("/products/new");
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
            <form id={"myCheck"} onSubmit={handleSubmit}>
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

                {/*  Verifie si on est en mode edition ou création de produit  */}
                {/*  MODE CREATION DE PRODUIT  */}
                {(!editing && <div className="form-group">
                    {extras.map(extra => <div key={extra.id} className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"
                               value={extra.title}
                               id={extra.id}

                        />
                        <label className="custom-control-label" htmlFor={extra.id}>{extra.title}</label>
                    </div>)}


                </div>) || (<div className="form-group">



                    {/*  MODE EDITION DE PRODUIT  */}
                    {/*  Boucle qui nous permet de verifier si un extra appartient au produit si oui on coche la case directement    */}
                    <label>Selectionner vos extras</label>
                    {extras.map(extra => {
                        let check = false;


                        for (let i = 0; i < extrasByProduct.length; i++){
                            if(extrasByProduct[i].extra.id === extra.id){
                                check = true;
                            }
                        }
                        if (check){
                            return(
                                <div key={extra.id} className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           value={extra.title}
                                           id={extra.id}
                                           defaultChecked={true}
                                    />
                                    <label className="custom-control-label" htmlFor={extra.id}>{extra.title}</label>
                                </div>
                            )
                        }else{
                            return (
                                <div key={extra.id} className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           value={extra.title}
                                           id={extra.id}
                                    />
                                    <label className="custom-control-label" htmlFor={extra.id}>{extra.title}</label>
                                </div>
                            )
                        }
                    })}


                </div>)}

                <div className={"form-group"}>
                    <button className={"btn btn-success"} type={"submit"}>Enregistrer</button>
                    <Link to={"/products"} className={"btn btn-link"}>Retour à la liste</Link>
                </div>
            </form>
            </div>
        </>
    )
};

export default ProductPage;