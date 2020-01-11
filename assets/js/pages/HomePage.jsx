import React, {useContext} from 'react';
import CartContext from "../contexts/CartContext";

const HomePage = () => {
    const contextValue = useContext(CartContext);
    return(
        <div className={"homecontainer"}>



    </div>
    )
};

export default HomePage;

