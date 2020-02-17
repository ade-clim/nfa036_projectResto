import React from 'react';
import h01 from "../../img/h01.jpg";


const GalleryProduct = ({products, setModalShow, setProduct, verifExtraByProduct}) => {
    return(
        <div className="">
            <div className={"gallery"}>
                {products.map(product =>
                    <div key={product.id}>
                        <a onClick={() => (setModalShow(true), setProduct({id: product.id, title: product.title, price: product.price, quantity: 1}), (verifExtraByProduct(product)) )}><img src={h01} className="mt-5 img"/></a>
                        <p>{product.title}</p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default GalleryProduct;