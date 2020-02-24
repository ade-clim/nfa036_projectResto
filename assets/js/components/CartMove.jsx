import React from 'react';



const CartMove = ({totalCart, totalPrice, handleQuantityLess, handleQuantityMore}) => {
    return(
        <div className={"cart_move"}>
            <div className={"row"}>
                <div className={""}>
                    <div className="card" style={{width: "22rem"}}>
                        <button className="btn card-header">{totalCart.length > 0 && <span>Valider mon panier</span> || <span>Mon panier</span>}</button>

                        <div className="card-body">
                            <div className="card-text">
                                {totalCart.length > 0
                                &&
                                <>
                                    {totalCart.map(productInCart =>
                                        <div key={productInCart.id}>
                                            <div className={"text-left"}>
                                                <button className={"btn btn-link btn-sm"} disabled={productInCart.quantity === 0} onClick={() => handleQuantityLess(productInCart)}>-</button>
                                                {productInCart.quantity}
                                                <button className={"btn btn-link btn-sm"} onClick={() => handleQuantityMore(productInCart)}>+</button>
                                                <span>{productInCart.title} {((productInCart.price + productInCart.priceSuppTotal) * productInCart.quantity)}</span>
                                                {productInCart.supplements.map(supplement => <p>{supplement.title}</p>)}
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <div>Total : {totalPrice} euros</div>
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