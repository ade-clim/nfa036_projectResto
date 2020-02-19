import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import categoryApi from "../services/categoryApi";
import Field from "../components/forms/Fields";
import extraApi from "../services/extraApi";
import supplementApi from "../services/supplementApi";
import extraProductApi from "../services/extraProductApi";
import extraSupplementApi from "../services/extraSupplementApi";




const ExtraPage = ({match, history}) => {
    const {id = "new"} = match.params;

    const [supplements, setSupplements] = useState([]);


    const [extraSupplement, SetExtraSupplement] = useState({
        extra: "",
        supplement: ""
    });


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


    const fetchSupplements = async () => {
        const data = await supplementApi.findAll();
        setSupplements(data);
    };


    // Chargement de l'extra si besoin au chargement du composant ou au changement de l'id
    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchExtra(id);
        };
    }, [id]);


    useEffect(() => {
        fetchSupplements();
    }, []);


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setExtra({...extra, [name]: value});
    };


    const lastProductCreate= async (id) => {
        const supplementTab = [...supplements];

        // Recup les value des case du checkbox cocher
        const el = document.getElementById('myCheck');
        const productsSupplements = el.getElementsByTagName('input');

        for (let i = 0; i < productsSupplements.length; i++) {
            if (productsSupplements[i].type === 'checkbox' && productsSupplements[i].checked === true) {
                const value = supplements.filter(f => f.title === productsSupplements[i].value);
                const supplementProduct = {supplement: value[0].id, extra: id};
                console.log(supplementProduct)
                await extraSupplementApi.create(supplementProduct);
            }
        }

    };


    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if(editing){
                await extraApi.update(id,extra);

                // TODO : Flash notification de succés
            }else{
                const data = await extraApi.create(extra);

                // on envoie l'id du produit qui viens d'etre créer
                lastProductCreate(data.data.id);

                // TODO : Flash notification success
                setExtra({
                    title: "",
                    description: ""
                });

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
            <div className={"container homecontainer"}>
                {(!editing && <h1>Création d'un extra</h1>) || (<h1>Modification d'un extra</h1>) }
                <form id={"myCheck"} onSubmit={handleSubmit}>
                    <Field name={"title"}
                           label={"Titre extra"}
                           placeholder={"Titre de l'extra"}
                           value={extra.title}
                           onChange={handleChange}
                           error={errors.title}
                    />
                    <Field name={"description"}
                           label={"Description extra"}
                           placeholder={"Description de votre extra"}
                           value={extra.description}
                           onChange={handleChange}
                           error={errors.description}
                    />
                    <label>Selectionner vos suppléments</label>




                    {/*  Verifie si on est en mode edition ou création de produit  */}
                    {/*  MODE CREATION DE PRODUIT  */}
                    {(!editing && <div className="form-group">
                        {supplements.map(supplement => <div key={supplement.id} className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"
                                   value={supplement.title}
                                   id={supplement.id}

                            />
                            <label className="custom-control-label" htmlFor={supplement.id}>{supplement.title}</label>
                        </div>)}


                    </div>) || (<div className="form-group">

                        {/*  MODE EDITION DE PRODUIT  */}
                        {/*  Boucle qui nous permet de verifier si un extra appartient au produit si oui on coche la case directement    */}
                        {extras.map(extra => {
                            let check = false;

                            for (let i = 0; i < extrasByProduct.length; i++){
                                if(extrasByProduct[i].extra.id === extra.id){
                                    check = true;
                                    tab.push(extra.title);
                                }
                            }
                            if (check){
                                return(
                                    <div key={extra.id} className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"
                                               onChange={handleChecked}
                                               value={extra.title}
                                               id={extra.id}
                                               defaultChecked
                                        />
                                        <label className="custom-control-label" htmlFor={extra.id}>{extra.title}</label>
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={extra.id} className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"
                                               onChange={handleChecked}
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
                        <button type={"submit"} className={"btn btn-success"}>
                            Enregister
                        </button>
                        <Link to={"/extras"} className={"btn btn-link"}>
                            Retour à la liste
                        </Link>
                    </div>










                </form>
            </div>
    )
};

export default ExtraPage;