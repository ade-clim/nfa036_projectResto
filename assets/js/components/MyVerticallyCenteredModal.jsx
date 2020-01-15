import React,{useState, useEffect} from 'react'
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import img from "../../img/h01.jpg";
import Button from "react-bootstrap/Button";

const MyVerticalCenteredModal = ({product, onHide, show, extras, tarifCart}) => {

    const [tarif, setTarif] = useState();
    const [amount, setAmount] = useState(1);
    const [extrasProduct, setExtrasProduct] = useState([]);


    useEffect(() => {
       setTarif(product.price);
       if(amount !== 1){
           setAmount(1);
       }
    },[show]);

    // {product.productExtras.map(productExtra => extras.map(extras => extras.title))}
    return (
        <Modal
            {...{onHide, show}}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            multiple

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {product.title}
                </Modal.Title>
            </Modal.Header>

            <Image src={img} fluid/>
            <Modal.Body>

                <h5 className={"text-center text-dark mb-5"}>{product.description}</h5>
                {/*Boucle qui affiche les extras disponible pour le produit actuel */}
                {extras.map(extra =>
                    <div key={extra.id} className={"mb-4"}>
                        <h6>{extra.description} :</h6>
                        <ul className={"list-group"}>
                            <li className="list-group-item list-group-item-action border-0">
                                Cras justo odio
                                <input type="checkbox" aria-label="Radio button for following text input" className={"ml-3"}/>
                                </li>
                            <li className="list-group-item list-group-item-action border-0">
                                Dapibus ac facilisis in
                                <input type="checkbox" aria-label="Radio button for following text input" className={"ml-3"}/>
                            </li>
                        </ul>
                    </div>
                )}
                <div className={"mt-4"}>

                </div>
                <div className={"text-center"}>
                    <Button disabled={amount === 1} variant={"link"} onClick={() => (setAmount(amount - 1 ), setTarif(tarif - product.price))}>-</Button>
                    {amount}
                    <Button variant={"link"} onClick={() => (setAmount(amount + 1 ), setTarif(tarif + product.price))}>+</Button>
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onHide} variant={"outline-info"} className={"col-3"}>Annuler</Button>
                <Button variant={"info"} className={"col-8 ml-4"} onClick={() => tarifCart(tarif)}>Total {tarif} €</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default MyVerticalCenteredModal;