import React,{useEffect} from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalOrders = ({order, onHide, show}) => {



    useEffect(() => {

    },[]);

    const newOrder = () => {
        console.log(order)
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
                        x{product.quantity} {product.products.title} <br/>
                        <span className={"ml-4"}>{product.supplements.length > 0 && product.supplements}</span>
                    </p>

                </div>)}
                <p>Total {order.price} euros</p>
            </Modal.Body>
            <Modal.Footer>
                <button className={"btn btn-info mr-auto"} onClick={() => {newOrder()}}>re-commander</button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalOrders;