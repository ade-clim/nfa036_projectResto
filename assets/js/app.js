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
import extraProductApi from "./services/extraProductApi";
import SupplementsPage from "./pages/SupplementsPage";
import SupplementPage from "./pages/SupplementPage";

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

    const [products, setProducts] = useState({
        id: "",
        categoryId: "",
        title: "",
        price: "",
        description: ""
    });

    // On va récuperer tous nos produits et les stockers en fonction de leur catégorie
    const handleProduct = async  () => {
        try {
            const data = await productApi.findAll();

            //setProducts({id: id, categoryId: categoryId, title: title, price: price, description: description});

            const productExtra = await extraProductApi.findAll();
            const tabBurgers = [];
            const tabSnacks = [];
            const tabDrinks = [];
            const tabDesserts = [];
            const tabMenuKids = [];
            const tabOthers = [];

            // Boucle qui va recuperer les produits en fonction de leur catégorie ET recuperer leur extras en fonction de l'id produit
            for (let i = 0 ; i < data.length; i++){
                if(data[i].category.id === 1){
                    let extraByProduct = [];
                    for(let j = 0; j < productExtra.length; j++){
                        if(data[i].id === productExtra[j].product.id){
                            extraByProduct.push({id: productExtra[j].id, extra: productExtra[j].extra, product: productExtra[j].product});
                        }
                    }
                    const product = {id: data[i].id, title: data[i].title, categoryId: data[i].category.id, description: data[i].description, price: data[i].price, productExtra: extraByProduct};
                    tabBurgers.push(product);
                    setBurgers(tabBurgers);
                }
                if(data[i].category.id === 2){
                    tabSnacks.push(data[i]);
                    setSnacks(tabSnacks);
                }
                if(data[i].category.id === 3){
                    tabDrinks.push(data[i]);
                    setDrinks(tabDrinks);
                }
                if(data[i].category.id === 4){
                    tabDesserts.push(data[i]);
                    setDesserts(tabDesserts);
                }
                if(data[i].category.id === 5){
                    tabMenuKids.push(data[i]);
                    setMenuKids(tabMenuKids);
                }
                if(data[i].category.id === 6){
                    tabOthers.push(data[i]);
                    setOthers(tabOthers);
                }

            }

        }catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        handleProduct();
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



                            <Route path="/card/burgers" component={(props) => <CategorysCarte {...props} productList={burgers} />} />
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
