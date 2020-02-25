import React from 'react';



const CartMove = ({totalCart, totalPrice, handleQuantityLess, handleQuantityMore}) => {
    return(
        <div className={"cart_move"}>
            <div className={"row"}>
                <div className={""}>
                    <div className="card" style={{width: "22rem"}}>
                        {totalCart.length > 0 &&
                        <button className="btn card-header bg-primary text-white"> <span>Valider mon panier</span></button>
                        ||
                        <button className="btn card-header" disabled><span>Mon panier</span></button>
                        }

                        <div className="card-body">
                            <div className="card-text">
                                {totalCart.length > 0
                                &&
                                <>
                                    {totalCart.map(productInCart =>
                                        <div key={productInCart.id}>
                                            <div>
                                                <button className={"btn btn-link btn-sm"} disabled={productInCart.quantity === 0} onClick={() => handleQuantityLess(productInCart)}>-</button>
                                                {productInCart.quantity}
                                                <button className={"btn btn-link btn-sm"} onClick={() => handleQuantityMore(productInCart)}>+</button>
                                                <span className={"cart_move_title"}>{productInCart.title}</span>
                                                <span className={"cart_move_price"}>{((productInCart.price + productInCart.priceSuppTotal) * productInCart.quantity)} </span>
                                                <div className={"cart_move_supp"}>  {productInCart.supplements.map(supplement => <span className={"text-lowercase mr-1"}>{supplement.title}</span>)}</div>
                                                <hr width={"60%"}/>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <div className={"text-center mt-4"}>Total : {totalPrice} euros</div>
                                    </div>
                                </>

                                ||
                                <span>Panier vide</span>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CartMove;