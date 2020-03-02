import React, {useContext, useEffect, useState} from 'react';
import CartContext from "../contexts/CartContext";
import AuthContext from "../contexts/AuthContext";
import LoginApp from "../components/LoginApp";
import AddressApp from "../components/AddressApp";
import CalculPriceCart from "../components/CalculPriceCart";
import OrderApi from "../services/OrderApi";
import addressDeliveryApi from "../services/addressDeliveryApi";



const ValidationPanier = () => {

    const { totalCart, updateTotalCart } = useContext(CartContext);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [addressSelect, setAddressSelect] = useState({
        id: "",
        street: "",
        number: "",
        city: "",
        postalCode: ""
    });

    useEffect(() => {

    },[]);

    const calculPanier = () => {
        let totalPanier = 0;
        totalCart.map(p =>  totalPanier = totalPanier + (p.price + p.priceSuppTotal) * p.quantity);
        return totalPanier;
    };


    const handleSubmit = async () => {
        const order = {price: calculPanier(), addressDelivery: addressSelect.id};
        await OrderApi.create(order);

        for (let i =0; i < totalCart.length; i++){
            const productCart = {id:totalCart.id};
        }
    };


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
                        <AddressApp setAddressSelect={setAddressSelect}/>
                        <button className={"btn btn-primary mt-4"} onClick={handleSubmit}>Valider votre commande</button>
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
                        <tr><td>Total : <CalculPriceCart/> €</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
};

export default ValidationPanier;