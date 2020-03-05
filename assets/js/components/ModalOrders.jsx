import React, {useContext, useEffect} from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CartContext from "../contexts/CartContext";

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : AFFICHE LE RECAP DANS UN MODAL DE LA COMMANDE PRECEDEMMENT PASSER                                        *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ModalOrders = ({order, onHide, show, verifCartStorage}) => {

    const { totalCart, updateTotalCart} = useContext(CartContext);

    useEffect(() => {
    },[]);


    const newOrder = () => {
        // on supprime le localStorage
        let productCart = [];
        for(let i =0; i< order.orderDetails.length; i++){
            const saveTotalCart = [...totalCart];
            let supp = [];
            let priceSupp = 0;
            let product = {id:order.orderDetails[i].products.id, title:order.orderDetails[i].products.title, price: order.orderDetails[i].products.price, quantity:order.orderDetails[i].quantity, supplements: []};

            for(let j =0; j < order.orderDetails[i].orderdetailsSupplements.length; j++){
                supp.push(order.orderDetails[i].orderdetailsSupplements[j].supplement);
                priceSupp += order.orderDetails[i].orderdetailsSupplements[j].supplement.price
            }
            const productModify = {...product, supplements: supp, priceSuppTotal: priceSupp};
            productCart.push(productModify);
        }
        updateTotalCart(productCart);
        verifCartStorage();
    };


    return (
        <Modal
            {...{onHide, show}}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            multiple
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    #{order.orderNumber} {order.dateOrder}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {order.orderDetails.map(product => <div key={product.id} className={""}>
                    <p>
                        x{product.quantity} {product.products.title} {product.products.id}<br/>
                        {product.orderdetailsSupplements.map(supplement =>
                            <span key={supplement.id} className={"ml-1"}>{supplement.supplement.title}</span>)
                        }
                    </p>
                </div>)}
                <p>Total {order.price} euros</p>
            </Modal.Body>
            <Modal.Footer>
                <button className={"btn btn-info mr-auto"} onClick={newOrder}>re-commander</button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalOrders;