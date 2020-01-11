import React, {useState, useEffect, useContext} from 'react';
import NavBarVertical from "../components/NavBarVertical";
import {Route} from "react-router-dom";
import Burgers from "./Burgers";
import categoryApi from "../services/categoryApi";

const Card = ({tarifTest}) => {

    const [burgers, setBurgers] = useState([]);

    const handleProduct = async  () => {
        try {
            const data = await categoryApi.find(1);
            setBurgers(data.products);
            //data.products.map(product => product.extras.forEach(extras => console.log("je suis dans le card "+ extras.title)))

        }catch (error) {
            console.log(error.response)
        }
    };

    useEffect(() => {
        handleProduct();
    },[]);

    return(
            <div className="container-fluid">
                <div className="row ">
                    <NavBarVertical toto={tarifTest}/>
                    <Route path="/card/burgers" component={(props) => <Burgers {...props} productList={burgers} tarifTest={tarifTest}/>} />
                    </div>
            </div>
    )
};

export default Card;