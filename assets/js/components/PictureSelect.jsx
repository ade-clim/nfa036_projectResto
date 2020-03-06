import React, {useEffect, useState} from 'react';
import Select from "./forms/Select";
import burger01 from '../../img/carte/burgers/burger01.png';
import burger02 from '../../img/carte/burgers/burger02.png';
import burger03 from '../../img/carte/burgers/burger03.png';
import burger04 from '../../img/carte/burgers/burger04.png';
import burger05 from '../../img/carte/burgers/burger05.png';
import burger06 from '../../img/carte/burgers/burger06.png';
import burger07 from '../../img/carte/burgers/burger07.png';
import burger08 from '../../img/carte/burgers/burger08.png';
import burger09 from '../../img/carte/burgers/burger09.png';
import burger10 from '../../img/carte/burgers/burger10.png';

import boisson01 from '../../img/carte/boissons/boisson01.png';
import boisson02 from '../../img/carte/boissons/boisson02.png';
import boisson03 from '../../img/carte/boissons/boisson03.png';
import boisson04 from '../../img/carte/boissons/boisson04.png';
import boisson05 from '../../img/carte/boissons/boisson05.png';
import boisson06 from '../../img/carte/boissons/boisson06.png';
import boisson07 from '../../img/carte/boissons/boisson07.png';
import boisson08 from '../../img/carte/boissons/boisson08.png';
import boisson09 from '../../img/carte/boissons/boisson09.png';
import boisson10 from '../../img/carte/boissons/boisson10.png';


import snack01 from '../../img/carte/snacks/snack01.png';
import snack02 from '../../img/carte/snacks/snack02.png';
import snack03 from '../../img/carte/snacks/snack03.png';
import snack04 from '../../img/carte/snacks/snack04.png';
import snack05 from '../../img/carte/snacks/snack05.png';

import salade01 from '../../img/carte/salades/salade01.png';
import salade02 from '../../img/carte/salades/salade02.png';
import salade03 from '../../img/carte/salades/salade03.png';
import salade04 from '../../img/carte/salades/salade04.png';

import dessert01 from '../../img/carte/desserts/dessert01.png';
import dessert02 from '../../img/carte/desserts/dessert02.png';
import dessert03 from '../../img/carte/desserts/dessert03.png';
import dessert04 from '../../img/carte/desserts/dessert04.png';
import dessert05 from '../../img/carte/desserts/dessert05.png';
import dessert06 from '../../img/carte/desserts/dessert06.png';

import menuKids01 from '../../img/carte/menus kids/menuKids01.png';
import menuKids02 from '../../img/carte/menus kids/menuKids02.png';
const PictureSelect = ({product, errors, handleChange}) => {

    return(<>
            <Select
                name={"picture"}
                label={"Picture"}
                value={product.picture}
                error={errors.picture}
                onChange={handleChange}
            >
                <option ></option>

                {product.category == 1 && <>
                    <option value={burger01} style={{backgroundImage: `url(${burger01})`, height: "10px",width:"10px"}}>burger chicken</option>
                    <option value={burger02} style={{backgroundImage: `url(${burger02})`, height: "10px",width:"10px"}}>cheeseburger</option>
                    <option value={burger03} style={{backgroundImage: `url(${burger03})`, height: "10px",width:"10px"}}>crispy chicken</option>
                    <option value={burger04} style={{backgroundImage: `url(${burger04})`, height: "10px",width:"10px"}}>double steack</option>
                    <option value={burger05} style={{backgroundImage: `url(${burger05})`, height: "10px",width:"10px"}}>double steack cantal</option>
                    <option value={burger06} style={{backgroundImage: `url(${burger06})`, height: "10px",width:"10px"}}>wrap steack</option>
                    <option value={burger07} style={{backgroundImage: `url(${burger07})`, height: "10px",width:"10px"}}>hamburger</option>
                    <option value={burger08} style={{backgroundImage: `url(${burger08})`, height: "10px",width:"10px"}}>long fish</option>
                    <option value={burger09} style={{backgroundImage: `url(${burger09})`, height: "10px",width:"10px"}}>triple steack</option>
                    <option value={burger10} style={{backgroundImage: `url(${burger10})`, height: "10px",width:"10px"}}>wrap veggie</option>
                </>}
                {product.category == 2 && <>
                    <option value={snack01} style={{backgroundImage: `url(${snack01})`, height: "10px",width:"10px"}}>beignets fromage</option>
                    <option value={snack02} style={{backgroundImage: `url(${snack02})`, height: "10px",width:"10px"}}>tenders</option>
                    <option value={snack03} style={{backgroundImage: `url(${snack01})`, height: "10px",width:"10px"}}>frites</option>
                    <option value={snack04} style={{backgroundImage: `url(${snack02})`, height: "10px",width:"10px"}}>croquettes de poisson</option>
                    <option value={snack05} style={{backgroundImage: `url(${snack01})`, height: "10px",width:"10px"}}>oignons ring</option>
                </>}
                {product.category == 3 && <>
                    <option value={boisson01} style={{backgroundImage: `url(${boisson01})`, height: "10px",width:"10px"}}>coca cherry</option>
                    <option value={boisson02} style={{backgroundImage: `url(${boisson02})`, height: "10px",width:"10px"}}>coca zero</option>
                    <option value={boisson03} style={{backgroundImage: `url(${boisson03})`, height: "10px",width:"10px"}}>coca cola</option>
                    <option value={boisson04} style={{backgroundImage: `url(${boisson04})`, height: "10px",width:"10px"}}>fanta</option>
                    <option value={boisson05} style={{backgroundImage: `url(${boisson05})`, height: "10px",width:"10px"}}>ice tea green</option>
                    <option value={boisson06} style={{backgroundImage: `url(${boisson06})`, height: "10px",width:"10px"}}>ice tea peche</option>
                    <option value={boisson07} style={{backgroundImage: `url(${boisson07})`, height: "10px",width:"10px"}}>minute maid</option>
                    <option value={boisson08} style={{backgroundImage: `url(${boisson08})`, height: "10px",width:"10px"}}>san pellegrino</option>
                    <option value={boisson09} style={{backgroundImage: `url(${boisson09})`, height: "10px",width:"10px"}}>sprite</option>
                    <option value={boisson10} style={{backgroundImage: `url(${boisson10})`, height: "10px",width:"10px"}}>vittel</option>
                </>}

                {product.category == 4 && <>
                    <option value={dessert01} style={{backgroundImage: `url(${dessert01})`, height: "10px",width:"10px"}}>glaces chantilly</option>
                    <option value={dessert02} style={{backgroundImage: `url(${dessert02})`, height: "10px",width:"10px"}}>milkshake</option>
                    <option value={dessert03} style={{backgroundImage: `url(${dessert03})`, height: "10px",width:"10px"}}>sundae</option>
                    <option value={dessert04} style={{backgroundImage: `url(${dessert04})`, height: "10px",width:"10px"}}>fondant chocolat</option>
                    <option value={dessert05} style={{backgroundImage: `url(${dessert05})`, height: "10px",width:"10px"}}>compote</option>
                    <option value={dessert06} style={{backgroundImage: `url(${dessert06})`, height: "10px",width:"10px"}}>donuts</option>
                </>}

                {product.category == 6 && <>
                    <option value={salade01} style={{backgroundImage: `url(${dessert01})`, height: "10px",width:"10px"}}>salade chicken</option>
                    <option value={salade02} style={{backgroundImage: `url(${dessert02})`, height: "10px",width:"10px"}}>petite salade</option>
                    <option value={salade03} style={{backgroundImage: `url(${dessert03})`, height: "10px",width:"10px"}}>salade caesar</option>
                    <option value={salade04} style={{backgroundImage: `url(${dessert04})`, height: "10px",width:"10px"}}>salade veggie</option>
                </>}

                {product.category == 5 && <>
                    <option value={menuKids01} style={{backgroundImage: `url(${menuKids01})`, height: "10px",width:"10px"}}>menu enfant</option>
                    <option value={menuKids02} style={{backgroundImage: `url(${menuKids02})`, height: "10px",width:"10px"}}>menu enfant</option>
                </>}
            </Select>

        </>

    )
};
export default PictureSelect;