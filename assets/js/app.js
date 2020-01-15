import React, {useEffect, useState} from 'react';
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
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";
import Footer from "./components/Footer";
import Card from "./pages/Card";
import Burgers from "./pages/Burgers";
import ExtrasPage from "./pages/ExtrasPage";
import ExtraPage from "./pages/ExtraPage";
import categoryApi from "./services/categoryApi";

require('../css/app.css');

authApi.setup();

const App = () => {

    // TODO: Il faudrait par défaut qu'on demande à notre authApi si on est connecté ou non
    const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());

    const NavbarWithRouter = withRouter(Navbar);

    const [burgers, setBurgers] = useState([]);
    const [tarifTest, setTarifTest] = useState(0);

    const handleProduct = async  () => {
        try {
            const data = await categoryApi.find(1);
            setBurgers(data.products);

        }catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        handleProduct();
    },[]);


    return(<>
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <HashRouter>
            <main>
            <NavbarWithRouter/>
                <Switch>
                    <Route path={"/login"} component={LoginPage}/>
                    <Route path={"/register"} component={RegisterPage}/>
                    <Route path="/card/burgers" component={(props) => <Burgers {...props} productList={burgers} />} />
                    <Route path={"/card"} component={(props) => <Card {...props}/>}/>
                    <PrivateRoute path={"/extras/:id"} component={ExtraPage}/>
                    <PrivateRoute path={"/extras"} component={ExtrasPage}/>
                    <PrivateRoute path={"/users/:id"} component={UserPage}/>
                    <PrivateRoute path={"/users"} component={UsersPage}/>
                    <PrivateRoute path={"/products/:id"} component={ProductPage}/>
                    <PrivateRoute path={"/products"} component={ProductsPage}/>
                    <PrivateRoute path={"/categorys/:id"} component={CategoriePage}/>
                    <PrivateRoute path={"/categorys"} component={CategoriesPage}/>
                    <Route path={"/"} component={HomePage}/>
                </Switch>
            <Footer/>
            </main>
        </HashRouter>
        </AuthContext.Provider>
   </> )
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
