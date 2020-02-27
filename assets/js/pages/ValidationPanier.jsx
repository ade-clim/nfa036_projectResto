import React, {useContext, useEffect} from 'react';
import CartContext from "../contexts/CartContext";
import AuthContext from "../contexts/AuthContext";
import LoginApp from "../components/LoginApp";
import AddressApp from "../components/AddressApp";



const ValidationPanier = () => {

    const { totalCart, totalPrice, updateTotalCart, updateTotalPrice } = useContext(CartContext);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    useEffect(() => {

    },[]);


    return(
        <div className={"container homecontainer"}>
            <div className={"row"}>
                <div className={"col-6"}>
                    {!isAuthenticated &&
                    <>
                        <LoginApp/>
                        <button className={"btn btn-primary"} disabled>Valider votre commande</button>
                    </>
                    ||
                    <>
                        <h3>adresse de livraison</h3>
                        <AddressApp />
                        <button className={"btn btn-primary"} >Valider votre commande</button>
                    </>
                    }
                </div>

                <div className={"col-6"}>
                    <h3>ma commande</h3>
                    <table>
                        <tbody>
                        {totalCart.map(product =>
                            <>
                                <tr>
                                    <td>x{product.quantity} {product.title}  {((product.price + product.priceSuppTotal) * product.quantity)}€</td>
                                </tr>
                                <tr>
                                    <td>{product.supplements.map(supplement => <span className={"text-lowercase mr-1"}>{supplement.title}</span>)}</td>
                                </tr>
                            </>
                        )}
                        <tr><td>Total : {totalPrice} €</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
};

export default ValidationPanier;