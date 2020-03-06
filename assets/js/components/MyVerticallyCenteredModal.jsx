import React,{useState, useEffect} from 'react'
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import img from "../../img/h01.jpg";
import Button from "react-bootstrap/Button";

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : MODAL POUR AFFICHER LES INFORMATIONS DU PRODUIT SELECTIONNER(SUPPLEMENT, PRIX, TITLE, DESCRIPTION)       *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MyVerticalCenteredModal = ({product, onHide, show, extras, handleChangeTarif}) => {

    const [tarif, setTarif] = useState();
    const [amount, setAmount] = useState(1);
    const [listSupplementsSelect, setListSupplementSelect] = useState([]);
    const [priceSupp, setPriceSupp] = useState(0);

    useEffect(() => {
       setTarif(product.price);
       if(amount !== 1){
           setAmount(1);
       }
    },[show]);

    const selectSupplementProduct = (supplement) => {
        let verif = false;
        if(listSupplementsSelect.length > 0){
            for(let i = 0; i < listSupplementsSelect.length; i++){
                if(listSupplementsSelect[i].id === supplement.id){
                    const tab = listSupplementsSelect.filter(t => t.id !== supplement.id );
                    setListSupplementSelect(tab);
                    setPriceSupp(priceSupp - supplement.price);
                    verif = true;
                }
            }
            if(verif === false){
                setListSupplementSelect([...listSupplementsSelect, supplement]);
                setPriceSupp(priceSupp + supplement.price);
            }
        }else{
            setListSupplementSelect([...listSupplementsSelect, supplement]);
            setPriceSupp(priceSupp + supplement.price);
        }
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
                    {product.title}
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className={"modal_size"}>
                        <div className={"text-center"}>
                            <Image src={product.picture} fluid width={"350px"}/>
                        </div>

                    <h5 className={"text-center text-dark mb-5"}>{product.description}</h5>
                    {/*Boucle qui affiche les extras disponible pour le produit actuel */}
                    {extras.map(extra =>
                        <div key={extra.id}>
                            {extra.supplement.length > 0 &&
                            <div className={"mb-4"} >
                                <h6 className={"font-weight-bold mb-2"} style={{fontSize: "1em"}}>{extra.description} :</h6>
                                {extra.supplement.map(supplement =>
                                    <ul key={supplement.supplement.id} className={"list-group vertical_modal_check"}>
                                        <li className="list-group-item list-group-item-action border rounded mb-2 ">
                                            <input type="checkbox" className={"ml-3"} onClick={() => {selectSupplementProduct(supplement.supplement)}} width={"30px"} height={"30px"}/>
                                            <label><span className={"ml-2"} style={{fontSize:"1em"}}>
                                                <span>{supplement.supplement.title}</span>
                                                {supplement.supplement.price > 0 &&
                                                <span className={"float-right"}>
                                                    +{supplement.supplement.price} €
                                                </span>}
                                            </span></label>

                                        </li>
                                    </ul>
                                )}
                            </div>
                            }
                        </div>
                    )}

                    <div className={"text-center"}>
                        <Button disabled={amount === 1} variant={"link"} onClick={() => (setAmount(amount - 1 ), setTarif(tarif - product.price))}>-</Button>
                        {amount}
                        <Button variant={"link"} onClick={() => (setAmount(amount + 1 ), setTarif(tarif  + product.price ))}>+</Button>
                    </div>
                    </div>
                </Modal.Body>



            <Modal.Footer>
                <Button onClick={onHide} variant={"outline-info"} className={"col-3"}>Annuler</Button>
                <Button variant={"info"} className={"col-8 ml-4"} onClick={() => handleChangeTarif(product, amount, listSupplementsSelect, priceSupp)}>Total {tarif + priceSupp * amount} €</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default MyVerticalCenteredModal;