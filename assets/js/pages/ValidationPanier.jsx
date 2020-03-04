import React, {useContext, useEffect, useState} from 'react';
import CartContext from "../contexts/CartContext";
import AuthContext from "../contexts/AuthContext";
import LoginApp from "../components/LoginApp";
import AddressApp from "../components/AddressApp";
import CalculPriceCart from "../components/CalculPriceCart";
import OrderApi from "../services/OrderApi";
import addressDeliveryApi from "../services/addressDeliveryApi";
import OrderDetailApi from "../services/OrderDetailApi";
import {toast} from "react-toastify";
import orderDetailsSupplementsApi from "../services/orderDetailsSupplementsApi";



const ValidationPanier = ({history}) => {

    const { totalCart, updateTotalCart } = useContext(CartContext);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [addressSelect, setAddressSelect] = useState({
        id: "",
        street: "",
        number: "",
        city: "",
        postalCode: ""
    });
    const [validationOrder, setValidationOrder] = useState(false);

    useEffect(() => {
        if(totalCart.length <= 0){
            history.replace("/")
        }
    },[]);

    const calculPanier = () => {
        let totalPanier = 0;
        totalCart.map(p =>  totalPanier = totalPanier + (p.price + p.priceSuppTotal) * p.quantity);
        return totalPanier;
    };


    const handleSubmit = async () => {
        const saveCart = [...totalCart];

        try {
            const order = {price: calculPanier(), addressDelivery: addressSelect.id};
            const myOrder = await OrderApi.create(order);


            // Validation commande
            setValidationOrder(true);
            toast.success("🍔 Commande créer !");

            for (let i =0; i < totalCart.length; i++){
                let supp = [];
                if(totalCart[i].supplements.length > 0){
                    for (let s = 0; s < totalCart[i].supplements.length; s++){
                        supp.push(totalCart[i].supplements[s].id);
                    }
                }

                // on creer l'orderDetails en base de donnée
                const orderDetail = {productsId: totalCart[i].id, ordersId:myOrder.data.id, quantity: totalCart[i].quantity, supplements: supp};
                const orderDetailCreate = await OrderDetailApi.create(orderDetail);

                // on parcours les supplements un par un pour creer en base de donnée la relation orderDetailsSupplements
                for (let o = 0; o < supp.length; o++){
                    const supplement = supp[o];
                    const orderDetailSupplement = {orderDetail: orderDetailCreate.data.id, supplement: supplement};
                    await orderDetailsSupplementsApi.create(orderDetailSupplement);
                }

                // on supprime le panier dans localStorage
                localStorage.removeItem("cartStorage");

            }

        }catch (error) {
            updateTotalCart(saveCart);
            console.log(error)
        }

    };


    return(
        <div className={"container homecontainer"}>
            <div className={"row"}>
                {!validationOrder &&
                <>
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
                            {addressSelect.id > 0 &&
                            <button className={"btn btn-primary mt-4"} onClick={handleSubmit}>Valider votre commande</button>
                            ||
                            <button className={"btn btn-primary mt-4"} disabled onClick={handleSubmit}>Valider votre commande</button>
                            }

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
                </>
                ||
                    <div className={"col-12"}>
                        <h1>Merci pour votre commande</h1>
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

                }

            </div>


        </div>
    )
};

export default ValidationPanier;