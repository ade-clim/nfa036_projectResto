import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Fields";
import {Link} from "react-router-dom";
import extraApi from "../services/extraApi";
import supplementApi from "../services/supplementApi";
import verif from "../verifRoles";



const SupplementPage = ({match, history}) => {
    const {id = "new"} = match.params;
    const [supplement, setSupplement] = useState({
        title: "",
        description: "",
        price: 0
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        price: ""
    });

    const [editing, setEditing] = useState(false);

    // Recuperation de l'extra en fonction de l'id
    const fetchSupplement = async id => {
        try {
            const {title, description, price} = await supplementApi.find(id);
            setSupplement({title, description, price});

        }catch (error) {
            console.log(error.response);
            // TODO : notification flash d'une erreur
            history.replace("/supplements");
        }
    };

    useEffect(() => {
        if(verif !== "ROLE_ADMIN" && verif !== "ROLE_MANAGER"){
            history.replace("/");
        }
        if(id !== "new"){
            setEditing(true);
            fetchSupplement(id);
        };

    },[id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setSupplement({...supplement, [name]: value});
    };


    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        console.log(supplement.price)
        event.preventDefault();
        const supp = {title: supplement.title, description: supplement.description, price: parseFloat(supplement.price)};
        console.log(supp)
        try {
            if(editing){
                await supplementApi.update(id,supp);

                // TODO : Flash notification de succés
            }else{
                await supplementApi.create(supp);

                // TODO : Flash notification de succés
                setErrors({});
                history.replace("/supplements");
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
          {(!editing && <h1>Création d'un supplément</h1>) || (<h1>Modification d'un supplément</h1>) }
          <form onSubmit={handleSubmit}>
              <Field name={"title"}
                     label={"Titre supplément"}
                     placeholder={"Titre du supplément"}
                     value={supplement.title}
                     onChange={handleChange}
                     error={errors.title}
              />
              <Field name={"description"}
                     label={"Description supplément"}
                     placeholder={"Description du supplément"}
                     value={supplement.description}
                     onChange={handleChange}
                     error={errors.description}
              />
              <Field name={"price"}
                     type={"number"}
                     label={"Prix du supplément"}
                     placeholder={"Prix du supplément"}
                     value={supplement.price}
                     onChange={handleChange}
                     error={errors.description}
              />
              <div className={"form-group"}>
                  <button type={"submit"} className={"btn btn-success"}>
                      Enregister
                  </button>
                  <Link to={"/supplements"} className={"btn btn-link"}>
                      Retour à la liste
                  </Link>
              </div>
          </form>
      </div>
  )
};
export default SupplementPage;