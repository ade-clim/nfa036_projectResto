import React, {useEffect, useState, useContext} from 'react'
import MyVerticalCenteredModal from "../components/MyVerticallyCenteredModal";
import NavBarVertical from "../components/NavBarVertical";
import CartContext from "../contexts/CartContext";
import CartMove from "./CartMove";
import GalleryProduct from "./GalleryProduct";
import {toast} from "react-toastify";


/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : COMPONENT POUR AFFICHER LES PRODUITS (VISUEL) AINSI QUE LE CARTMOVE                                      *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CategorysCarte = ({productList}) => {


    // recupere le produit actuel pour recuperer ces extras
    const [products, setProducts] = useState(productList);
    const [product, setProduct] = useState({
        id:"",
        title:"",
        price: "",
        quantity: "",
        supplements: [],
    });

    const { totalCart, updateTotalCart} = useContext(CartContext);
    const [modalShow, setModalShow] = useState(false);
    const [extras, setExtras] = useState([]);

    const handleChangeTarif = (product, amount, listSupplements, priceSupp) => {

        // verifier si le produit existe deja dans le panier si oui on modifie la quantité à +1
        const recupCartContext = [...totalCart];
        const productModify = {...product, quantity: amount, supplements: listSupplements, priceSuppTotal: priceSupp};
        let verif = false;
        let cpt = 0;

        if (recupCartContext.length > 0) {
            //parcours les produits dans le panier
            for (let i = 0; i < recupCartContext.length; i++) {
                // verifie si le produit dans le panier est égale au produit qu'on ajoute
                if (recupCartContext[i].id === productModify.id) {
                    // verifie si la longueur des supplements est égale
                    if (recupCartContext[i].supplements.length === productModify.supplements.length) {
                        // parcours les supplements du produit et de ceux dans le panier
                        for (let o = 0; o < recupCartContext[i].supplements.length; o++) {
                            for (let p = 0; p < productModify.supplements.length; p++) {
                                // si le supplement correspond on incremente
                                if (productModify.supplements[p].id === recupCartContext[i].supplements[o].id) {
                                    cpt += 1;
                                }
                                if(cpt === productModify.supplements.length){
                                    recupCartContext[i].quantity += amount;
                                    verif = true;
                                    cpt = 0;
                                    updateTotalCart(recupCartContext)
                                }
                            }
                        }
                    }
                    if(recupCartContext[i].supplements.length === 0 && productModify.supplements.length === 0){
                        recupCartContext[i].quantity += amount;
                        verif = true;
                        updateTotalCart(recupCartContext)
                    }
                }
            }
        }
        if (verif === false) {
            // recuperation et ajout du produit puis envoie dans panier
            const productCart = [...totalCart, productModify];
            updateTotalCart(productCart);
        }
        toast.success("🍔 Produit ajouter au panier!");
    };


    // Methode qui va recuperer les extras qui appartiennent au produit actuel
    const verifExtraByProduct = (product) => {
        const productExtrasList = product.productExtras;
        const extras = productExtrasList.map(t => t.extra);
        // on trie le tableau
        extras.sort((a, b) => a.id - b.id);
        setExtras(extras);
    };

    // On ajoute un produit en plus et on modifie le prix du produit
    const handleQuantityMore = (product)=>{
        const totalCartSave = [...totalCart];
        for (let i = 0; i < totalCartSave.length; i++){
            if(totalCartSave[i] === product){
                totalCartSave[i].quantity += 1;
            }
        }
        updateTotalCart(totalCartSave)
    };

    // on supprime un produit en quantité et si 0 on le supprime du panier
    const handleQuantityLess = (product)=>{
        const totalCartSave = [...totalCart];
        for (let i = 0; i < totalCartSave.length; i++){
            if(totalCartSave[i] === product) {
                if (totalCartSave[i].quantity !== 1) {
                    totalCartSave[i].quantity -= 1;
                    updateTotalCart(totalCartSave)
                } else {
                    if (totalCartSave.length === 1) {
                        //on supprime le panier en localStorage si la quantité est égale à 0
                        localStorage.removeItem('cartStorage');
                    }
                    const totalCartDeleteProduct = totalCartSave.filter(item => item !== totalCartSave[i]);
                    updateTotalCart(totalCartDeleteProduct);
                    }
            }
        }

    };

    return (<>
        <div className={"container-fluid"}>
            <div className={"row"}>
                <NavBarVertical/>

                <div className={"col-9 homecontainer"} >
                    <div className={""}>
                        <div className={""}>
                            <h1>Burgers</h1>
                        </div>

                        <div className={"offset-9"}>
                            <CartMove totalCart={totalCart} handleQuantityLess={handleQuantityLess} handleQuantityMore={handleQuantityMore}/>
                        </div>
                            <GalleryProduct products={products} setModalShow={setModalShow} setProduct={setProduct} verifExtraByProduct={verifExtraByProduct}/>

                            <MyVerticalCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                product={product}
                                extras={extras}
                                handleChangeTarif={handleChangeTarif}
                            />

                    </div>

                </div>
            </div>
        </div>

    </>)
};

export default CategorysCarte;