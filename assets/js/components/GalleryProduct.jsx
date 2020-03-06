import React from 'react';

/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : COMPONENT POUR AFFICHER LES PRODUITS EN FONCTION DE LA CATEGORIE                                         *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const GalleryProduct = ({products, setModalShow, setProduct, verifExtraByProduct}) => {
    return(
        <div className="">
            <div className={"gallery"}>
                {products.map(product =>

                    <div key={product.id}>
                        <a onClick={() => (setModalShow(true), setProduct({id: product.id, title: product.title, price: product.price, quantity: 1, picture: product.picture}),(verifExtraByProduct(product)))}>
                            <div className={"img mt-5 text-center"}>
                                <img src={product.picture} width={"220px"} className={"pb-5"}/>
                                <p>{product.title}</p>
                            </div>

                        </a>

                    </div>
                )}
            </div>
        </div>
    )
};

export default GalleryProduct;