import React,{useState, useEffect} from 'react'
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import img from "../../img/h01.jpg";
import Button from "react-bootstrap/Button";


const MyVerticalCenteredModal = ({changetoto, product, onHide, show}) => {

    const [tarif, setTarif] = useState();
    const [amount, setAmount] = useState(1);


    useEffect(() => {
       setTarif(product.price);
       if(amount !== 1){
           setAmount(1);
       }
    },[show]);


    return (
        <Modal
            {...{changetoto, product, onHide, show}}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {product.title}
                </Modal.Title>
            </Modal.Header>
            <Image src={img} fluid/>
            <Modal.Body>
                <h4 className={"text-center"}>Centered Modal</h4>
                <p>
                    {product.description}
                </p>
                <div className={"text-center"}>
                    <Button disabled={amount === 1} variant={"link"} onClick={() => setAmount(amount - 1 )}>-</Button>
                    {amount}
                    <Button variant={"link"} onClick={() => (setAmount(amount + 1 ), setTarif(tarif + product.price))}>+</Button>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant={"outline-info"} className={"col-3"}>Annuler</Button>
                <Button variant={"info"} className={"col-8 ml-4"} onClick={() => changetoto(tarif)}>Total {tarif} €</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default MyVerticalCenteredModal;