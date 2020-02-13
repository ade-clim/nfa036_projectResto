import React, {useState, useEffect} from 'react';
import NavBarVertical from "../components/NavBarVertical";
import {Route} from "react-router-dom";
import categoryApi from "../services/categoryApi";
import CartMove from "../components/CartMove";

const Card = () => {

    const [burgers, setBurgers] = useState([]);

    const handleProduct = async  () => {
        try {
            const data = await categoryApi.find(1);
            setBurgers(data.products);

        }catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        handleProduct();
    },[]);

    return(<>
        <NavBarVertical/>

    </> )
};

export default Card;