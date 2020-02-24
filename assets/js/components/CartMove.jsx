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
                                    {totalCart.map(ProductInCart =>
                                        <div key={ProductInCart.id}>
                                            <span className={"text-left"} key={ProductInCart.id}>
                                                <button  className={"btn btn-link btn-sm"} disabled={ProductInCart.quantity === 0} onClick={() => handleQuantityLess(ProductInCart)}>-</button>
                                                {ProductInCart.quantity}
                                                <button className={"btn btn-link btn-sm"} onClick={() => handleQuantityMore(ProductInCart)}>+</button>
                                            </span>
                                            {ProductInCart.title} {(ProductInCart.price * ProductInCart.quantity)}
                                        </div>
                                    )}
                                    <div>
                                        <p>Total : {totalPrice} euros</p>
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