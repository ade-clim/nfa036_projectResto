import React, {useEffect, useState, useContext} from 'react'
import h01 from '../../img/h01.jpg'
import img from '../../img/h01.jpg'
import MyVerticalCenteredModal from "../components/MyVerticallyCenteredModal";
import NavBarVertical from "../components/NavBarVertical";
import CartContext from "../contexts/CartContext";
import Button from "react-bootstrap/Button";

const CategorysCarte = ({productList, tarifCart}) => {




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
    const [amount, setAmount] = useState(1);

    const handleChangeTarif = (product) => {

        const productCart = [...totalCart, product];
        updateTotalPrice(totalPrice + product.price);
        updateTotalCart(productCart);
    };


    // Recuperation de la bonne facture dans l'identifiant de l'url change
    useEffect(() => {
        setProducts(productList);
    }, []);


    // Methode qui va recuperer les extras qui appartiennent au produit actuel
    const verifExtraByProduct = (product) => {
        const productExtrasList = product.productExtras;
        const extrasByProductList = productExtrasList.map(r => r.extra);
        setExtras(extrasByProductList);

    };

    const handleQuantityMore = (product)=>{
        const totalCartSave = [...totalCart];
        for (let i = 0; i < totalCartSave.length; i++){
            if(totalCartSave[i] === product){
                totalCartSave[i].quantity += 1;
                updateTotalPrice(totalPrice + product.price)

            }
        }

        updateTotalCart(totalCartSave);
    };

    const handleQuantityLess = (product)=>{
        const totalCartSave = [...totalCart];
        for (let i = 0; i < totalCartSave.length; i++){
            if(totalCartSave[i] === product){
                totalCartSave[i].quantity -= 1;
                updateTotalPrice(totalPrice - product.price)
            }
        }

        updateTotalCart(totalCartSave);
    };

// <button  className={"btn btn-link btn-sm"} disabled={amount === 0} variant={"link"} onClick={() => ((ProductIncart.quantity - 1 ), setTarif(tarif - product.price))}>-</button>
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
                            <div className={"cart_move"}>
                                <div className={"row"}>
                                    <div className={""}>
                                        <div className="card" style={{width: "22rem"}}>
                                            <button className="btn card-header">{totalCart.length > 0 && <span>Valider mon panier</span> || <span>Mon panier</span>}</button>

                                            <div className="card-body">
                                                <p className="card-text">
                                                    {totalCart.length > 0
                                                    &&
                                                    <>
                                                        {totalCart.map(ProductInCart =>
                                                            <div>
                                                                <span className={"text-left"} key={ProductInCart.id}>
                                                                    <button  className={"btn btn-link btn-sm"} disabled={ProductInCart.quantity === 0} onClick={() => handleQuantityLess(ProductInCart)}>-</button>
                                                                    {ProductInCart.quantity}
                                                                    <button className={"btn btn-link btn-sm"} onClick={() => handleQuantityMore(ProductInCart)}>+</button>
                                                                </span>
                                                                {ProductInCart.title} {(ProductInCart.price * ProductInCart.quantity)}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p>Total : {totalPrice}</p>
                                                        </div>
                                                    </>

                                                    ||
                                                    <span>Panier vide</span>
                                                    }



                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div className="">
                                <div className={"gallery"}>
                                    {products.map(product =>
                                        <div key={product.id}>
                                            <a onClick={() => (setModalShow(true), setProduct({id: product.id, title: product.title, price: product.price, quantity: 1}), (verifExtraByProduct(product)) )}><img src={h01} className="mt-5 img"/></a>
                                            <p>{product.title}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <MyVerticalCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                product={product}
                                extras={extras}
                                //tarifCart={tarifCart}
                                handleChangeTarif={handleChangeTarif}
                            />

                    </div>

                </div>
            </div>
        </div>



    </>)
};

export default CategorysCarte;