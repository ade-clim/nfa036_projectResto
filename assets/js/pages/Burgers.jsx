import React, {useEffect, useState} from 'react'
import h01 from '../../img/h01.jpg'
import img from '../../img/h01.jpg'
import MyVerticalCenteredModal from "../components/MyVerticallyCenteredModal";
import NavBarVertical from "../components/NavBarVertical";

const Burgers = ({productList}) => {


    const [burgers, setBurgers] = useState([]);
    const [product, setProduct] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [extras, setExtras] = useState([]);
    const [tarifCart, setTarifCart] = useState([]);

    // Recuperation de la bonne facture dans l'identifiant de l'url change
    useEffect(() => {
        setBurgers(productList);
    }, []);


    // Methode qui va recuperer les extras qui appartiennent au produit actuel
    const verifExtraByProduct = (product) => {
        const productExtrasList = product.productExtras;
        const extrasByProductList = productExtrasList.map(r => r.extra);
        setExtras(extrasByProductList);

    };

    const handleclick = (value) => {
        setTarifCart(tarifCart + value);
        console.log(tarifCart);
    };


    return (<>
        <div className="container-fluid">
            <div className="row ">
                <NavBarVertical/>

                <div className="container col-9 homecontainer">
                    <div>
                        <h1>Burgers</h1>
                    </div>
                    <div className="">
                        <div className={"gallery"}>
                            {burgers.map(product =>
                                <div key={product.id}>
                                    <a onClick={() => (setModalShow(true), setProduct(product), (verifExtraByProduct(product)) )}><img src={h01} className="mt-5 img"/></a>
                                </div>
                            )}
                        </div>
                    </div>
                    <MyVerticalCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        product={product}
                        extras={extras}
                        tarifCart={handleclick}
                    />
                </div>


            </div>
        </div>

    </>)
};

export default Burgers;