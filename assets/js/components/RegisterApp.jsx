import React, {useState} from 'react';
import addressApi from "../services/addressApi";
import registerApi from "../services/registerApi";
import Field from "./forms/Fields";
import LoginApp from "./LoginApp";
import {toast} from "react-toastify";

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : COMPONENT D'ENREGISTREMENT                                                                               *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RegisterApp = () => {
    const [register, setRegister] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: "",
        address: "",
        roles:""
    });

    const [address, setAddress]= useState({
        street: "",
        number: "",
        city: " ",
        postalCode: " "
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiErrors = {};

        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            return;
        }

        try {

            // AJOUTER UNE  VERIFICATION AVANT ENVOIE DE L'ADRESSES
            //Creation addresses par default
            const addresseUser = await addressApi.create(address);
            const myUser = {...user, address: addresseUser.data.id, roles: ["ROLE_USER"]};
            await registerApi.register(myUser);

            toast.success("🍔 Utilisateur créer!");
            setErrors({});

        }catch(error){
            const {violations} = error.response.data;
            if(violations){
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    };

    return(
        <>
            {register &&
            <LoginApp/>
            ||
                <>
                    <h1>Formulaire d'inscription</h1>
                    <form onSubmit={handleSubmit}>
                        <Field name={"firstName"}
                               label={"Prénom"}
                               placeholder={"Votre prénom"}
                               error={errors.firstName}
                               value={user.firstName}
                               onChange={handleChange}
                        />
                        <Field name={"lastName"}
                               label={"Nom"}
                               placeholder={"Votre nom"}
                               error={errors.lastName}
                               value={user.lastName}
                               onChange={handleChange}
                        />
                        <Field name={"email"}
                               label={"Adresse email"}
                               placeholder={"Votre adresse email"}
                               error={errors.email}
                               value={user.email}
                               onChange={handleChange}
                        />
                        <Field name={"password"}
                               label={"Mot de passe"}
                               type={"password"}
                               placeholder={"Votre mot de passe"}
                               error={errors.password}
                               value={user.password}
                               onChange={handleChange}
                        />
                        <Field name={"passwordConfirm"}
                               label={"Confirmation du mot de passe"}
                               type={"password"}
                               placeholder={"Confirmez votre mot de passe"}
                               error={errors.passwordConfirm}
                               value={user.passwordConfirm}
                               onChange={handleChange}
                        />
                        <div className={"form-group"}>
                            <button type={"submit"} className={"btn btn-success"}>Confirmation</button>
                            <button className={"btn btn-link"} onClick={() => {setRegister(true)}}>J'ai déjà un compte</button>
                        </div>
                    </form>
                </>
            }

        </>

    )
};

export default RegisterApp;