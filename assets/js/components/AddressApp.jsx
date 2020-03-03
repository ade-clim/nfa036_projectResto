import React, {useEffect, useState} from 'react';
import Field from "./forms/Fields";
import userApi from "../services/userApi";
import jwtDecode from "jwt-decode";
import addressDeliveryApi from "../services/addressDeliveryApi";


const AddressApp = ({setAddressSelect, history}) => {

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
        street: "",
        number: "",
        city: "",
        postalCode: "",
        phone: "",
        comment: ""
    });
    const [errors, setErrors] = useState({
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
            const data = await addressDeliveryApi.findAll();
            setListAddress(data)

        }
    };

    // Chargement du customer si besoin au chargement du composant ou au changement de l'id
    useEffect(() => {
        handleFetchUser();
    }, [newAddress]);

    // Gestion des changements des inputs dans le formulaire
    const handleChangeAddress = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setAddressDelivery({...addressDelivery, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addressDeliveryApi.create(addressDelivery);
            setAddressDelivery({street:"",number:"", city:"", postalCode: "", phone: "", comment:""} );
            setNewAddress(false);
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
    const handleChangeAdress = () => {
        const valeur = document.querySelector('input[name=adress]:checked').value;
        const adressSelect = listAddress.filter(p => p.id == valeur);
        setAddressSelect({id:adressSelect[0].id, street:adressSelect[0].street, number: adressSelect[0].number, city:adressSelect[0].city, postalCode: adressSelect[0].postalCode});
    };


    return (<>
            <div>
                {!newAddress && <>
                    <button className={"link text-success font-weight-bold btn btn-link"} onClick={() => {setNewAddress(true)}}>nouvelle adresse</button>
                    {listAddress.map(address =>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="radio" name="adress" id="adress01"
                                   value={address.id} onChange={handleChangeAdress}/>
                                   <ul key={address.id} className={"pt-2 pb-2 col-10 list-group border"}>
                                       <li className={"list-group-item border-0"}>{address.number} {address.street}</li>
                                       <li className={"list-group-item border-0 "}>{address.postalCode} {address.city}</li>
                                       <li className={"list-group-item border-0"}>{address.comment}</li>
                                       <li className={"list-group-item border-0"}>{address.phone}</li>
                                   </ul>
                        </div>
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
                                <button className={"btn btn-success"}>Creer</button>
                                <button onClick={() => {setNewAddress(false)}} className={"btn btn-link"}>
                                    Retour à la liste
                                </button>
                            </div>

                        </form>
                    </>}
            </div>
    </>)
};
export default AddressApp;