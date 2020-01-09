import React, {useState, useEffect} from 'react';
import NavBarVertical from "../components/NavBarVertical";
import {Switch, Route, HashRouter, Link} from "react-router-dom";
import Burgers from "./Burgers";
import categoryApi from "../services/categoryApi";

const Card = () => {

    const [burgers, setBurgers] = useState([]);

    const handleProduct = async  () => {
        try {
            const data = await categoryApi.find(1);
            setBurgers(data.products);
        }catch (error) {
            console.log(error.response)
        }
    };


    useEffect(() => {
        handleProduct();
    },[]);

    return(
        <HashRouter>
            <div className="container-fluid">
                <div className="row ">
                    <NavBarVertical/>
                    <Switch>
                        <Route path={"/card/burgers"} component={(props) => <Burgers {...props} toto={burgers}/>}/>
                    </Switch>
                    </div>
            </div>
        </HashRouter>
    )
};

export default Card;