import React, {useContext, useEffect} from 'react';

import LoginApp from "../components/LoginApp";
import AuthContext from "../contexts/AuthContext";

const LoginPage = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    useEffect(() => {
        if(isAuthenticated){
            history.replace("/");
        }
    },[isAuthenticated]);

    return(
        <>
            <div className={"container homecontainer"}>
                <LoginApp/>
            </div>
        </>
    )
};
export default LoginPage;