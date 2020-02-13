import React, {useEffect, useState} from 'react'
import h01 from '../../img/h01.jpg'
import img from '../../img/h01.jpg'
import MyVerticalCenteredModal from "../components/MyVerticallyCenteredModal";
import NavBarVertical from "../components/NavBarVertical";

const CategorysCarte = ({productList, tarifCart}) => {


    const [burgers, setBurgers] = useState([]);

    // recupere le produit actuel pour recuperer ces extras
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [extras, setExtras] = useState([]);


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
        <div className={"container homecontainer"}>
            <div className={""}>
                <div className={"col-12"}>
                    <div>
                        <h1>Burgers</h1>
                    </div>
                    <div className={"container cart_move"}>
                        <div className={"row"}>
                            <div className={" col-12 text-right"}>
                                <p>{cart}</p>
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
                        tarifCart={tarifCart}
                    />
                </div>
            </div>

        </div>


    </>)
};

export default CategorysCarte;