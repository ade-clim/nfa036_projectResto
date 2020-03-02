import React, {useContext, useState} from 'react';
import CartContext from "../contexts/CartContext";


const CalculPriceCart = () => {

    const { totalCart, updateTotalCart} = useContext(CartContext);


    let totalPanier = 0;
  return (
      <span>
        {totalCart.map(p => { totalPanier = totalPanier + (p.price + p.priceSuppTotal) * p.quantity})}
          {totalPanier}
      </span>
  )
};

export default CalculPriceCart;