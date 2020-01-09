import React, {useEffect, useState} from 'react'
import h01 from '../../img/h01.jpg'
import categoryApi from "../services/categoryApi";

const Burgers = ({toto}) => {

    const [burgers, setBurgers] = useState([]);
    const [category, setCategory] = useState({
        title:"",
        products: []
    });


    const [products, setProducts] = useState([]);

    // Permet de recuperer les produits par catégorie
    const fetchCategory = async (id) => {
        try {
            const data = await categoryApi.find(id);
            setProducts(data.products)
            setCategory(data);
        }catch (error) {
            console.log(error.response)
        }
    };


// Recuperation de la bonne facture dans l'identifiant de l'url change
    useEffect(() => {
        setBurgers(toto);
    }, []);

    return (<>
        <div className="container col-9 homecontainer">
            <div>
                <h1 on>Burgers</h1>
            </div>

            <div className="container col-12">
                <div className={"gallery"}>
                {burgers.map(product =><>
                    <div className={"row"}>
                    <img key={product.id} src={h01} className="col-md-3 mt-5 img"/>
                    </div>
                </>)}
                </div>
            </div>
        </div>
        </>
    )
};

export default Burgers;