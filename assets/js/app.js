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

import ExtrasPage from "./pages/ExtrasPage";
import ExtraPage from "./pages/ExtraPage";
import categoryApi from "./services/categoryApi";

import CategorysCarte from "./components/CategorysCarte";
import CartContext from "./contexts/CartContext";
import extraProductApi from "./services/extraProductApi";
import SupplementsPage from "./pages/SupplementsPage";
import SupplementPage from "./pages/SupplementPage";
import ValidationPanier from "./pages/ValidationPanier";
import productApi from "./services/productApi";
import supplementApi from "./services/supplementApi";

require('../css/app.css');

authApi.setup();

const App = () => {

    // TODO: Il faudrait par défaut qu'on demande à notre authApi si on est connecté ou non
    const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());
    const [totalCart, updateTotalCart] = useState([]);
    const [totalPrice, updateTotalPrice] = useState(0);


    const contextValue = {
        totalCart: totalCart,
        updateTotalCart: updateTotalCart,
        totalPrice : totalPrice,
        updateTotalPrice: updateTotalPrice
    };


    const NavbarWithRouter = withRouter(Navbar);

    const [burgers, setBurgers] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [menuKids, setMenuKids] = useState([]);
    const [others, setOthers] = useState([]);


    // On va verifier si localStorage, si oui on recuperer les id produit et supplement et on recupere produit api
    const cartStorageVerif = async ()=> {
        // 1. Voir si on a un panier de stocker
        const cartLocal = window.localStorage.getItem("cartStorage");
        const dataProduct = await productApi.findAll();
        const dataSupplement = await supplementApi.findAll();

        try {
            if(cartLocal){

                const totalCartStorage = cartLocal && JSON.parse(cartLocal);

                let cartStorage = [];

                for(let i = 0; i < totalCartStorage.length; i++){
                    const supp = [];
                    let priceSupp = 0;
                    // on verifie les id supplements du localStorage et des supplements dans l'api
                    for(let p = 0; p < totalCartStorage[i].supplements.length; p++){
                        for(let s = 0; s < dataSupplement.length; s++){
                            if(totalCartStorage[i].supplements[p].id === dataSupplement[s].id){
                                const suppCart = dataSupplement[s];
                                priceSupp = priceSupp + dataSupplement[s].price;
                                supp.push(suppCart)
                            }
                        }

                    }
                    for (let m = 0; m < dataProduct.length; m++){
                        if (totalCartStorage[i].id === dataProduct[m].id){
                            const product = dataProduct[m];
                            const productCart = {id:product.id, title: product.title, quantity: totalCartStorage[i].quantity, price: product.price, supplements: supp, priceSuppTotal:priceSupp };
                            cartStorage.push(productCart);
                        }
                    }
                    priceSupp = 0;
                }

                updateTotalCart(cartStorage);
                //updateTotalPrice(totalCartStorage[1]);
            }
        }catch (error) {
            console.log(error);
            //on supprile le panier en localStorage si la quantité est égale à 0
            localStorage.removeItem('cartStorage');
        }
    };

    // On va récuperer tous nos produits et les stockers en fonction de leur catégorie
    const handleProduct = async  () => {
        try {
            const data = await categoryApi.findAll();

            // Boucle qui va recuperer les produits en fonction de leur catégorie ET recuperer leur extras en fonction de l'id produit
            for (let i = 0 ; i < data.length; i++){
                if(data[i].id === 1){
                    setBurgers(data[i].products)
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

            }

        }catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        handleProduct();
        cartStorageVerif();
    },[]);





    return(<>
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <CartContext.Provider value={contextValue}>
                <HashRouter>
                    <main>
                        <NavbarWithRouter toto={totalCart}/>

                        <Switch>
                            <Route path={"/login"} component={LoginPage}/>
                            <Route path={"/register"} component={RegisterPage}/>


                            <Route path={"/card/validation"} component={ValidationPanier}/>
                            <Route path="/card/burgers" component={(props) => <CategorysCarte {...props} productList={burgers} snacks={snacks} drinks={drinks} />} />
                            <Route path="/card/snacks" component={(props) => <CategorysCarte {...props} productList={snacks} />} />
                            <Route path="/card/boissons" component={(props) => <CategorysCarte {...props} productList={drinks} />} />
                            <Route path="/card/desserts" component={(props) => <CategorysCarte {...props} productList={desserts} />} />
                            <Route path="/card/menu-enfants" component={(props) => <CategorysCarte {...props} productList={menuKids} />} />
                            <Route path="/card/others" component={(props) => <CategorysCarte {...props} productList={others} />} />
                            <Route path={"/card"} component={(props) => <Card {...props}/>}/>


                            <PrivateRoute path={"/supplements/:id"} component={SupplementPage}/>
                            <PrivateRoute path={"/supplements"} component={SupplementsPage}/>
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
