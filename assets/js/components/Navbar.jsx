import React,{useContext} from 'react';
import {NavLink} from "react-router-dom";
import authApi from "../services/authApi";
import AuthContext from "../contexts/AuthContext";


const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const handleLogout = () => {
        authApi.logout();
        setIsAuthenticated(false);
        history.push("/login")
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">SymReact</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <NavLink className="nav-link" to={"/users"}>Clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={"/products"}>Produits</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={"/categorys"}>Catégories</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (<>
                    <li className="nav-item">
                        <NavLink to={"/register"} className="nav-link">
                            Inscription
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/login"} className="btn btn-success">
                            Connexion !
                        </NavLink>
                    </li>
                        </>
                    )) || (
                    <li className="nav-item">
                        <button onClick={handleLogout} className="btn btn-danger">
                            Deconnexion
                        </button>
                    </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;