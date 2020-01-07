import React, {useEffect, useState} from 'react'
import h01 from '../../img/h01.jpg'
import categoryApi from "../services/categoryApi";

const Burgers = ({history, match}) => {
    const {id = "new"} = match.params;

    const [category, setCategory] = useState({
        title:"",
        products: ""
    });

    // Permet de recuperer les produits
    const fetchCategory = async (id) => {
        try {
            const {title, products} = await categoryApi.find(id);
            setCategory({title, products});
        }catch (error) {
            console.log(error.response)
        }
    };


// Recuperation de la bonne facture dans l'identifiant de l'url change
    useEffect(() => {
        if(id !== "new"){
            fetchCategory(id);
        }
    }, [id]);

    return (<>
        <div className="container col-9 pt-5 mt-5">
            <div>
                <h1>Burgers</h1>
            </div>
            <div className="row mt-5">
                <div className={"mt-5"}>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                </div>
                <div className={"mt-5"}>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                </div>
                <div className={"mt-5"}>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                    <span>
                        <img src={h01} className="col-md-3 img"/>
                    </span>
                </div>
            </div>
        </div>
        </>
    )
};

export default Burgers;