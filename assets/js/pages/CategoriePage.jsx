import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import categoryApi from "../services/categoryApi";
import Field from "../components/forms/Fields";




const CategoriePage = ({match, history}) => {

    const {id = "new"} = match.params;


    const [category, setCategory] = useState({
        title: ""
    });

    const [errors, setErrors] = useState({
        title: ""
    });

    const [editing, setEditing] = useState(false);


    // Recuperation du customer en fonction de l'id
    const fetchCategory = async id => {
        try {
            const {title} = await categoryApi.find(id);
            setCategory({title});

        }catch (error) {
            console.log(error.response);
            // TODO : notification flash d'une erreur
            history.replace("/category");
        }
    };


    // Chargement du customer si besoin au chargement du composant ou au changement de l'id
    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchCategory(id);
        };
    }, [id]);


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCategory({...category, [name]: value});
    };


    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if(editing){
                await categoryApi.update(id,category);

                // TODO : Flash notification de succés
            }else{
                await categoryApi.create(category);

                // TODO : Flash notification de succés
                history.replace("/category");
            }

            setErrors({});

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
            {(!editing && <h1>Création d'une catégorie</h1>) || (<h1>Modification d'une catégorie'</h1>) }
            <form onSubmit={handleSubmit}>
                <Field name={"title"}
                       label={"Titre catégorie"}
                       placeholder={"Titre de la catégorie"}
                       value={category.title}
                       onChange={handleChange}
                       error={errors.title}
                />
                <div className={"form-group"}>
                    <button type={"submit"} className={"btn btn-success"}>
                        Enregister
                    </button>
                    <Link to={"/category"} className={"btn btn-link"}>
                        Retour à la liste
                    </Link>
                </div>
            </form>
        </>
    )
};

export default CategoriePage;