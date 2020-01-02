import React, {useState}from 'react';
import ReactDom from 'react-dom';
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./contexts/AuthContext";
import authApi from "./services/authApi";
import PrivateRoute from "./components/PrivateRoute";
import CategoriePage from "./pages/CategoriePage";
require('../css/app.css');

authApi.setup();

const App = () => {

    // TODO: Il faudrait par défaut qu'on demande à notre authApi si on est connecté ou non
    const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());

    const NavbarWithRouter = withRouter(Navbar);

    return(
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
        <HashRouter>
            <NavbarWithRouter/>
            <main className={"container pt-5"}>
                <Switch>
                    <Route path={"/login"} component={LoginPage}/>
                    <PrivateRoute path={"/user"} component={UsersPage}/>
                    <PrivateRoute path={"/product"} component={ProductsPage}/>
                    <PrivateRoute path={"/category/:id"} component={CategoriePage}/>
                    <PrivateRoute path={"/category"} component={CategoriesPage}/>
                    <Route path={"/"} component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>
        </AuthContext.Provider>
    )
};
const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
