import React, {useEffect, useState} from 'react'
import h01 from '../../img/h01.jpg'
import img from '../../img/h01.jpg'
import MyVerticalCenteredModal from "../components/MyVerticallyCenteredModal";

const Burgers = ({productList, tarifTest}) => {


    const [burgers, setBurgers] = useState([]);
    const [product, setProduct] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [extras, setExtras] = useState([]);


    // Recuperation de la bonne facture dans l'identifiant de l'url change
    useEffect(() => {
        setBurgers(productList);
    }, []);


    //setExtras(product.extras.map(extras => extras.title))
    return (
        <div className="container col-9 homecontainer">
            <div>
                <h1>Burgers</h1>
            </div>
            <div className="">
                <div className={"gallery"}>
                {burgers.map(product =>
                    <div key={product.id}>
                        <a onClick={() => (setModalShow(true), setProduct(product), setExtras(product.extras.map(extras => extras)) )}><img src={h01} className="mt-5 img"/></a>
                    </div>
                )}
                </div>
            </div>
            <MyVerticalCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                extras={extras}
                tarifTest={tarifTest}
            />
        </div>
    )
};

export default Burgers;