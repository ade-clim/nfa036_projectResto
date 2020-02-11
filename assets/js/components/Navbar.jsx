import React,{useContext, useState, useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import authApi from "../services/authApi";
import AuthContext from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";
import logo01 from'../../img/logo01.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons'
import CartContext from "../contexts/CartContext";


const Navbar = ({history, toto}) => {

    // Recup données du Cartcontext
    //const contextValue = useContext(CartContext);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        id:""
    });

    const [tarifCart, setTarifCart] = useState(0);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);



    const handleFetchUser = () => {
        const token = window.localStorage.getItem("authToken");
        if(token){
            const {firstName, lastName, id} = jwtDecode(token);
            setUser({firstName: firstName, lastName: lastName, id: id})
        }
    };

    const handleLogout = () => {
        authApi.logout();
        setIsAuthenticated(false);
        history.push("/login")
    };

    useEffect(() => {
        handleFetchUser();
    }, []);

    const handleMouse = () => {
        console.log("testtesttest mouse")
    }

    return(
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className={"container col-10"}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark" to={"/card"}>Carte</NavLink>
                        </li>
                        {isAuthenticated && (<>
                            <li className="nav-item ">
                                <NavLink className="nav-link" to={"/users"}>Clients</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to={"/products"}>Produits</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to={"/categorys"}>Catégories</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/extras"}>Extras</NavLink>
                            </li>
                        </>)}
                    </ul>

                    <ul className={"navbar-nav ml-auto pt-5"}>
                        <li>
                            <NavLink to={"/"} className="navbar-brand logo"><img src={logo01} width={"140px"}/></NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li>

                            <div onMouseUp={<p>ceci est un test</p>} className="navbar-brand mycard"><FontAwesomeIcon color={"black"} icon={faCartArrowDown} />{toto}</div>
                        </li>
                        {(!isAuthenticated &&
                            (<>
                                    <li className="nav-item">
                                        <NavLink to={"/register"} className="nav-link">
                                            Inscription
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={"/login"} className="btn btn-primary">
                                            Connexion !
                                        </NavLink>
                                    </li>
                                </>
                            )) || (<>
                            <li className="nav-item">
                                <Link to={"/users/"+ user.id} className="btn btn-link text-secondary">
                                    Bonjour <small>{user.firstName} {user.lastName}</small>
                                </Link>

                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">
                                    Deconnexion
                                </button>
                            </li>
                        </>)}
                    </ul>
                </div>
            </div>
        </nav>
        </header>
    )
};
export default Navbar;