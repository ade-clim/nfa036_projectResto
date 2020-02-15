import React, {useEffect, useState, useContext} from 'react'
import h01 from '../../img/h01.jpg'
import img from '../../img/h01.jpg'
import MyVerticalCenteredModal from "../components/MyVerticallyCenteredModal";
import NavBarVertical from "../components/NavBarVertical";
import CartContext from "../contexts/CartContext";

const CategorysCarte = ({productList, tarifCart}) => {




    // recupere le produit actuel pour recuperer ces extras
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const { totalCart, updateTotalCart } = useContext(CartContext);

    const [modalShow, setModalShow] = useState(false);
    const [extras, setExtras] = useState([]);

    const handleChangeTarif = (product) => {
        const productCart = [...totalCart, product];
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
                                            <button className="btn card-header">Mon panier</button>

                                            <div className="card-body">
                                                <p className="card-text">
                                                    {totalCart.length > 0
                                                    &&
                                                    (totalCart.map(cart =>
                                                            <div key={cart.id}>
                                                                <p>
                                                                    {cart.title} {cart.price}
                                                                </p>
                                                            </div>
                                                        ))
                                                        ||
                                                    <p>Panier vide</p>
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
                                            <a onClick={() => (setModalShow(true), setProduct(product), (verifExtraByProduct(product)) )}><img src={h01} className="mt-5 img"/></a>
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