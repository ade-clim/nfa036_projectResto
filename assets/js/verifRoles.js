import jwtDecode from "jwt-decode";

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : VERIFIE LE ROLE DE L'USER EN SESSIONS                                                    *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function verif (){
    const token = window.localStorage.getItem("authToken");

    if(token){
        const {roles} = jwtDecode(token);
        return roles[0];
    }
};
export default verif();