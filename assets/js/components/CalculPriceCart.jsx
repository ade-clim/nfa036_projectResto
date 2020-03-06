import React, {useContext, useState} from 'react';
import CartContext from "../contexts/CartContext";

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : METHODE POUR CALCULER LA TARIF TOTAL DU PANIER EN FONCTION DES PRODUIT ET SUPPLEMENTS                    *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CalculPriceCart = () => {

    const { totalCart, updateTotalCart} = useContext(CartContext);


    let totalPanier = 0;
  return (
      <span>
        {totalCart.map(p => { totalPanier = totalPanier + (p.price + p.priceSuppTotal) * p.quantity})}
          {totalPanier > 0 && <span>{totalPanier} €</span>}

      </span>
  )
};

export default CalculPriceCart;