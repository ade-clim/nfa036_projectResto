import React from 'react';
import NavBarVertical from "../components/NavBarVertical";
import {Switch, Route, HashRouter, Link} from "react-router-dom";
import Burgers from "./Burgers";

const Card = () => {
    return(
        <HashRouter>
            <div className="container-fluid">
                <div className="row ">
                    <NavBarVertical/>
                    <Switch>
                        <Route path={"/card/:id"} component={Burgers}/>
                    </Switch>
                    </div>
            </div>
        </HashRouter>
    )
};

export default Card;