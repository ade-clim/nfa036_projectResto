import React, {useContext, useEffect} from 'react';
import CartContext from "../contexts/CartContext";



const ValidationPanier = () => {
    const { totalCart, totalPrice, updateTotalCart, updateTotalPrice } = useContext(CartContext);

    useEffect(() => {

    },[]);


    return(
        <div className={"container homecontainer"}>
            <h1>Validation commande</h1>
            <div className={"row"}>
                <div>
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