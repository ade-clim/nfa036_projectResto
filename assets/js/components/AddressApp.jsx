import React, {useEffect, useState} from 'react';
import Field from "./forms/Fields";
import {Link} from "react-router-dom";
import userApi from "../services/userApi";
import addressApi from "../services/addressApi";
import jwtDecode from "jwt-decode";


const AddressApp = () => {

    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
    });

    const [addressUser, setAddressUser] = useState({
        id: "",
        street: "",
        number: "",
        city: "",
        postalCode: ""
    });

    const [newAddress, setNewAddress] = useState(false);
    const [listAddress, setListAddress] = useState([]);
    const [addressDelivery, setAddressDelivery]= useState({
        id: "",
        street: "",
        number: "",
        city: "",
        postalCode: "",
        phone: "",
        comment: ""
    });
    const [errors, setErrors] = useState({
        id: "",
        street: "",
        number: "",
        city: "",
        postalCode: "",
        phone: "",
        comment: ""
    });

    const handleFetchUser = async () => {
        const token = window.localStorage.getItem("authToken");
        if(token){
            const {firstName, lastName, id} = jwtDecode(token);
            //on recup l'utilisateur
            const {phone, address} = await userApi.find(id);
            setUser({firstName: firstName, lastName: lastName, id: id, phone: phone});
            let phoneAddress = "";
            if(phone.length > 0){
                phoneAddress = phone
            }

            const addressUser = {id: address.id, street: address.street, number: address.number, city: address.city, postalCode: address.postalCode, phone:phoneAddress, comment: address.comment};
            setAddressUser(addressUser);
            setListAddress([...listAddress, addressUser] )
            //on recup les adresses de livraison enregistré de l'utilisateur

            //const listAddressDeliveryUser = await
        }
    };

    // Chargement du customer si besoin au chargement du composant ou au changement de l'id
    useEffect(() => {
        handleFetchUser();
    }, []);

    // Gestion des changements des inputs dans le formulaire
    const handleChangeAddress = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setAddress({...address, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await userApi.update(id,user);
            await addressApi.update(address.id, address);
            // TODO : Flash notification de succéss

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

    return (<>
            <div>
                {!newAddress && <>
                    <button className={"link text-success font-weight-bold btn btn-link"}>nouvelle adresse</button>
                    {listAddress.map(address =>
                        <ul key={address.id} className={"border pt-2 pb-2"}>
                            <li>{address.number} {address.street}</li>
                            <li>{address.postalCode} {address.city}</li>
                            <li></li>
                        </ul>
                    )}</>
                    ||
                    <>
                        <form onSubmit={handleSubmit}>
                            <Field name={"number"}
                                   label={"Numéro de rue"}
                                   placeholder={"Numéro de rue"}
                                   value={addressDelivery.number}
                                   onChange={handleChangeAddress}
                            />
                            <Field name={"street"}
                                   label={"Adresse"}
                                   placeholder={"Rue"}
                                   value={addressDelivery.street}
                                   onChange={handleChangeAddress}
                            />
                            <Field name={"postalCode"}
                                   label={"Code postal"}
                                   placeholder={"Code postal"}
                                   value={addressDelivery.postalCode}
                                   onChange={handleChangeAddress}
                            />
                            <Field name={"city"}
                                   label={"Ville"}
                                   placeholder={"Ville"}
                                   value={addressDelivery.city}
                                   onChange={handleChangeAddress}
                            />
                            <Field name={"phone"}
                                   label={"Numéro de téléphone"}
                                   placeholder={"+33 6 55 88 99 33"}
                                   value={addressDelivery.phone}
                                   onChange={handleChangeAddress}
                            />
                            <Field name={"comment"}
                                   label={"Instruction pour votre livreur ?"}
                                   placeholder={"ex: Porte de garage, pas de sonette appellez moi, merci"}
                                   value={addressDelivery.comment}
                                   onChange={handleChangeAddress}
                            />
                            <div className={"form-group"}>
                                <button type={"submit"} className={"btn btn-success"}>
                                    Enregister
                                </button>
                                <Link to={"/users"} className={"btn btn-link"}>
                                    Retour à la liste
                                </Link>
                            </div>
                        </form>
                    </>}
            </div>
    </>)
};
export default AddressApp;