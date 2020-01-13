import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Field from "../components/forms/Fields";
import categoryApi from "../services/categoryApi";
import productApi from "../services/productApi";
import Select from "../components/forms/Select";
import extraApi from "../services/extraApi";
import extraProductApi from "../services/extraProductApi";

const ProductPage = ({history, match}) => {

    const {id = "new"} = match.params;

    const [idLastProduct, setIdLastProduct] = useState();
    const [extras, setExtras] = useState([]);
    const [optionsChecked, setOptionChecked] = useState([]);

    const [extrasByProduct, setExtrasByProduct] = useState([]);
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


    //Recuperation des extras par produit
    const fetchExtrasByProduct = async (idProduit) => {
        console.log("je suis dans fetchExtrasByProduct")
        try {
            const data = await extraProductApi.findAll();
            // On stock les extras pour le produit en cours d'editions
            setExtrasByProduct(data.filter(extra => extra.product.id == idProduit));

            //console.log(Object.values(data));

            //On recupere l' id des extras que le produit en editions contient




        }catch (error) {
            // TODO : Flash notification erreur
            history.replace("/products");
        }
    };

    //Recuperation des extras disponible
    const fetchExtras = async () => {
        console.log("je suis dans fetchExtras");
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
            history.replace("/products");
        }
    };




    // Recuperation de la liste des categorys à chaque chargement de composant
    useEffect(() => {
        fetchProducts();
        fetchCategorys();
        fetchExtras();
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

    const lastProduct= async () => {
        const extraTab = [...extras];

        // on parcours nos options check pour recup les objets extras qui correspondents et on creer en base de données
        for (let i = 0; i < optionsChecked.length; i++){
            for (let p = 0; p < extraTab.length; p++){
                if (optionsChecked[i] === extraTab[p].title){
                    const ExtraProduct = {extra: extraTab[p].id, product: idLastProduct.id+1};
                    await extraProductApi.create(ExtraProduct);
                }
            }
        };
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            if(editing){
                //await productApi.update(id, product);
                // TODO : Flash notification success
            }else{
                await productApi.create(product);
                // creation des extraProduct en fonction du produit creer

                lastProduct();

                //console.log(product);
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


    // Va nous permettre de récup les extras qui sont cocher
    const handleChecked = (event)=> {

        let checkedArray = [...optionsChecked];
        let selectedValue = event.target.value;

        if (event.target.checked === true) {

            checkedArray.push(selectedValue);
            setOptionChecked(checkedArray);

        } else {

            let valueIndex = checkedArray.indexOf(selectedValue);
            checkedArray.splice(valueIndex, 1);

            setOptionChecked(checkedArray)
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

                {(!editing && <div className="form-group">
                    {extras.map(extra => <div key={extra.id} className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"
                               onChange={handleChecked}
                               value={extra.title}
                               id={extra.id}
                        />
                        <label className="custom-control-label" htmlFor={extra.id}>{extra.title}</label>
                    </div>)}

                    {optionsChecked.map(oc => <p>{oc}</p>)}

                </div>) || (<div className="form-group">
                    {extrasByProduct.map(test => <>{test.extra.id}</>)}
                    {extras.map(extra =>
                        <div key={extra.id} className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"
                                   onChange={handleChecked}
                                   name={extra.id}
                                   id={extra.id}
                                   //extrasByProduct.map(t => t.extra.id === extra.id)
                            />
                            <label className="custom-control-label" htmlFor={extra.id}>{extra.title}</label>
                        </div>
                    )}

                </div>) }

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