import React, {useContext, useEffect} from 'react';
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";
import jwtDecode from "jwt-decode";


const PrivateRoute = ({path, component}) => {

    const firstName = "";
    const token = window.localStorage.getItem("authToken");
    if(token){
        const user = jwtDecode(token);
        console.log(user.firstName);
    }


    if(firstName === "Sophie"){

    };

    const {isAuthenticated} = useContext(AuthContext);

    return isAuthenticated ? (<Route path={path} component={component} />) : (<Redirect to={"/login"}/>);
};

export default PrivateRoute;