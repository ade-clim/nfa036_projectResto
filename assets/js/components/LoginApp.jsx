import React, {useContext, useState} from 'react';
import Field from "./forms/Fields";
import AuthContext from "../contexts/AuthContext";
import authApi from "../services/authApi";

const LoginApp = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    // Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]:value});
    };

    // Gestion du submit
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            await authApi.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            //history.push("/");
        }catch (error) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas !")
        }
    };

    return(
        <>
            <h1>Connexion a l'application</h1>
            <form onSubmit={handleSubmit}>
                <Field type={"email"}
                   error={error}
                   name={"username"}
                   label={"Adresse email"}
                   placeholder={"Adresse email de connexion"}
                   value={credentials.username}
                   onChange={handleChange}
                />
                <Field type={"password"}
                   name={"password"}
                   label={"Mot de passe"}
                   placeholder={"Mot de passe"}
                   value={credentials.password}
                   onChange={handleChange}
                />
                <div className={"form-group"}>
                    <button className={"btn btn-success"}>Je me connecte</button>
                </div>
            </form>
        </>
    )
};

export default LoginApp;