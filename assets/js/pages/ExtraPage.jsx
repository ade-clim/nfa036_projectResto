import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import categoryApi from "../services/categoryApi";
import Field from "../components/forms/Fields";
import extraApi from "../services/extraApi";




const ExtraPage = ({match, history}) => {

    const {id = "new"} = match.params;


    const [extra, setExtra] = useState({
        title: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        description: ""
    });

    const [editing, setEditing] = useState(false);


    // Recuperation de l'extra en fonction de l'id
    const fetchExtra = async id => {
        try {
            const {title, description} = await extraApi.find(id);
            setExtra({title, description});

        }catch (error) {
            console.log(error.response);
            // TODO : notification flash d'une erreur
            history.replace("/extras");
        }
    };


    // Chargement de l'extra si besoin au chargement du composant ou au changement de l'id
    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchExtra(id);
        };
    }, [id]);


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setExtra({...extra, [name]: value});
    };


    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if(editing){
                await extraApi.update(id,extra);

                // TODO : Flash notification de succés
            }else{
                await extraApi.create(extra);

                // TODO : Flash notification de succés
                setErrors({});
                history.replace("/extras");
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
                {(!editing && <h1>Création d'un extra</h1>) || (<h1>Modification d'un extra</h1>) }
                <form onSubmit={handleSubmit}>
                    <Field name={"title"}
                           label={"Titre extra"}
                           placeholder={"Titre de l'extra"}
                           value={extra.title}
                           onChange={handleChange}
                           error={errors.title}
                    />
                    <Field name={"description"}
                           label={"Description extra"}
                           placeholder={"Choissisez votre extra"}
                           value={extra.description}
                           onChange={handleChange}
                           error={errors.description}
                    />
                    <div className={"form-group"}>
                        <button type={"submit"} className={"btn btn-success"}>
                            Enregister
                        </button>
                        <Link to={"/extras"} className={"btn btn-link"}>
                            Retour à la liste
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
};

export default ExtraPage;