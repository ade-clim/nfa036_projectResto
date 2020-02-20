import React, {useEffect, useState, useContext} from 'react'
import MyVerticalCenteredModal from "../components/MyVerticallyCenteredModal";
import NavBarVertical from "../components/NavBarVertical";
import CartContext from "../contexts/CartContext";
import CartMove from "./CartMove";
import GalleryProduct from "./GalleryProduct";


const CategorysCarte = ({productList}) => {


    // recupere le produit actuel pour recuperer ces extras
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        id:"",
        title:"",
        price: "",
        quantity: ""
    });

    const { totalCart, totalPrice, updateTotalCart, updateTotalPrice } = useContext(CartContext);
    const [modalShow, setModalShow] = useState(false);
    const [extras, setExtras] = useState([]);

    const handleChangeTarif = (product, amount) => {
        // verifier si le produit existe deja dans le panier si oui on modifie la quantité à +1
        const recupCartContext = [...totalCart];
        let verif = false;

        if(recupCartContext.length > 0) {
            for (let i = 0; i < recupCartContext.length; i++){
                if(recupCartContext[i].id === product.id){
                    recupCartContext[i].quantity += amount;
                    verif = true
                }
            }
        }
        if(verif === false){
            // recuperation et ajout du produit puis envoie dans panier
            const productModify = {...product, quantity: amount};
            const productCart = [...totalCart, productModify];
            updateTotalCart(productCart);
        }

        //mise à jour du prix total du panier
        updateTotalPrice(totalPrice + product.price * amount);
    };


    // Recuperation de la bonne facture dans l'identifiant de l'url change
    useEffect(() => {
        setProducts(productList);
    }, []);


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
                updateTotalPrice(totalPrice + product.price)
            }
        }
    };

    // on supprime un produit en quantité et si 0 on le supprime du panier
    const handleQuantityLess = (product)=>{
        const totalCartSave = [...totalCart];
        for (let i = 0; i < totalCartSave.length; i++){
            if(totalCartSave[i] === product){
                if(totalCartSave[i].quantity !== 1){
                    totalCartSave[i].quantity -= 1;
                    updateTotalPrice(totalPrice - product.price);
                }else{
                    if(totalCartSave.length === 1){
                        updateTotalPrice(0);
                    }

                    const totalCartDeleteProduct = totalCartSave.filter(item => item !== totalCartSave[i]);
                    updateTotalCart(totalCartDeleteProduct);
                    updateTotalPrice(totalPrice - product.price);


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
                            <CartMove totalCart={totalCart} totalPrice={totalPrice} handleQuantityLess={handleQuantityLess} handleQuantityMore={handleQuantityMore}/>
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