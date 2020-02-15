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
import productApi from "./services/productApi";
import CategorysCarte from "./components/CategorysCarte";
import CartContext from "./contexts/CartContext";

require('../css/app.css');

authApi.setup();

const App = () => {

    // TODO: Il faudrait par défaut qu'on demande à notre authApi si on est connecté ou non
    const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());
    const [totalCart, updateTotalCart] = useState([]);

    const contextValue = {
        totalCart: totalCart,
        updateTotalCart: updateTotalCart
    };


    const NavbarWithRouter = withRouter(Navbar);

    const [burgers, setBurgers] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [menuKids, setMenuKids] = useState([]);
    const [others, setOthers] = useState([]);

    const [tarifCart, setTarifCart] = useState(0);


    // On va récuperer tous nos produits et les stockers en fonction de leur catégorie
    const handleProduct = async  () => {
        try {
            const data = await categoryApi.findAll();
            for (let i = 0 ; i < data.length; i++){
                if(data[i].id === 1){
                    setBurgers(data[i].products);
                }
                if(data[i].id === 2){
                    setSnacks(data[i].products);
                }
                if(data[i].id === 3){
                    setDrinks(data[i].products);
                }
                if(data[i].id === 4){
                    setDesserts(data[i].products);
                }
                if(data[i].id === 5){
                    setMenuKids(data[i].products);
                }
                if(data[i].id === 6){
                    setOthers(data[i].products);
                }

            };

        }catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        handleProduct();
    },[]);


    const handleclick = (value) => {
        //setTarifCart(tarifCart + value);
        //updateTotalCart(totalCart + value)
    };



    return(<>
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <CartContext.Provider value={contextValue}>
                <HashRouter>
                    <main>
                        <NavbarWithRouter toto={totalCart}/>

                        <Switch>
                            <Route path={"/login"} component={LoginPage}/>
                            <Route path={"/register"} component={RegisterPage}/>



                            <Route path="/card/burgers" component={(props) => <CategorysCarte {...props} productList={burgers} tarifCart={handleclick}/>} />
                            <Route path="/card/snacks" component={(props) => <CategorysCarte {...props} productList={snacks} tarifCart={handleclick}/>} />
                            <Route path="/card/boissons" component={(props) => <CategorysCarte {...props} productList={drinks} tarifCart={handleclick}/>} />
                            <Route path="/card/desserts" component={(props) => <CategorysCarte {...props} productList={desserts} tarifCart={handleclick}/>} />
                            <Route path="/card/menu-enfants" component={(props) => <CategorysCarte {...props} productList={menuKids} tarifCart={handleclick}/>} />
                            <Route path="/card/others" component={(props) => <CategorysCarte {...props} productList={others} tarifCart={handleclick}/>} />
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
            </CartContext.Provider>
        </AuthContext.Provider>
   </> )
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
