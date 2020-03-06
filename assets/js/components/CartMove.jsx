import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import CalculPriceCart from "./CalculPriceCart";


/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : COMPONENT POUR LE PANIER CONTENANT LE TRAITEMENT ET L'AFFICHAGE DES PRODUIT                              *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CartMove = ({totalCart, handleQuantityLess, handleQuantityMore}) => {

    let cpt = 1;
    useEffect(() => {
        if(totalCart.length > 0){
            verifCartStorage();
        }
    },[]);

    const verifCartStorage = () => {

        let cartStorage = [];
        for(let i = 0; i < totalCart.length; i++){
            const supp = [];

            for(let p = 0; p < totalCart[i].supplements.length; p++){
                const suppCart = {id: totalCart[i].supplements[p].id};
                supp.push(suppCart)
            }
            const productCart = {id:totalCart[i].id, quantity: totalCart[i].quantity, supplements:supp};
            cartStorage.push(productCart);
        }

        // Je stock mon panier dans mon localStorage
        window.localStorage.setItem("cartStorage", JSON.stringify(cartStorage));

    };


    return(
        <div className={"cart_move"}>
            <div className={"row"}>
                <div className={""}>
                    <div className="card" style={{width: "22rem"}}>
                        {totalCart.length > 0 &&
                         <Link to={"/card/validation"}><button className="btn card-header bg-primary text-white col-12">Valider mon panier</button></Link>
                        ||
                        <button className="btn card-header" disabled><span>Mon panier</span></button>
                        }

                        <div className="card-body">
                            <div className={"cart_move_size"}>
                                <div className="card-text">
                                    {totalCart.length > 0
                                    &&
                                    <>
                                        {totalCart.map(productInCart =>
                                            <div key={cpt}>
                                                <div>
                                                    <button className={"btn btn-link btn-sm"} disabled={productInCart.quantity === 0} onClick={() => handleQuantityLess(productInCart)}>-</button>
                                                    {productInCart.quantity}
                                                    <button className={"btn btn-link btn-sm"} onClick={() => handleQuantityMore(productInCart)}>+</button>
                                                    <span className={"cart_move_title"}>{productInCart.title}</span>
                                                    <span className={"cart_move_price"}>{((productInCart.price + productInCart.priceSuppTotal) * productInCart.quantity)} </span>
                                                    <div className={"cart_move_supp"}>  {productInCart.supplements.map(supplement => <span className={"text-lowercase mr-1"}>{supplement.title}</span>)}</div>
                                                    <hr width={"60%"}/>
                                                </div>
                                                <span hidden>{cpt++}</span>
                                            </div>
                                        )}
                                    </>

                                    ||
                                    <span>Panier vide</span>
                                    }
                                </div>
                            </div>

                            {totalCart.length > 0 &&
                                <div>
                                    <div className={"text-center mt-4"}>Total : <CalculPriceCart/> euros</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CartMove;