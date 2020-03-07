import React from 'react';
import img01 from "../../img/Home/img01.jpg"
/***********************************************************************************************************************
 *                                                                                                                     *
 * OBJECTIF : PAGE D'ACCUEIL DU SITE                                                                                   *
 *                                                                                                                     *
 *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const HomePage = () => {
//<a href="#" className="btn btn-primary btn-xl rounded-pill mt-5">Learn More</a>
    return(
        <>
            <header className="masthead text-center text-white">
                <div className="masthead-content">
                    <div className="container">
                        <h1 className="masthead-heading mb-0 text-white home_title">Burger chic</h1>
                        <h2 className="masthead-subheading mb-0 text-white home_title">sur mesure</h2>

                    </div>
                </div>
                <div className="bg-circle-1 bg-circle"></div>
                <div className="bg-circle-2 bg-circle"></div>
                <div className="bg-circle-3 bg-circle"></div>
                <div className="bg-circle-4 bg-circle"></div>
            </header>

            <section>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="p-5">
                                <img className="img-fluid rounded-circle" src={img01} alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="p-5">
                                <h2 className="display-4 home_title">Produit frais</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio
                                    veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis
                                    recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="p-5">
                                <img className="img-fluid rounded-circle" src={img01} alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-5">
                                <h2 className="display-4 home_title">Fait maison</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio
                                    veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis
                                    recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="p-5">
                                <img className="img-fluid rounded-circle" src={img01} alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="p-5">
                                <h2 className="display-4 home_title">Qualité prix</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio
                                    veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis
                                    recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <footer className="py-5 bg-primary">
                <div className="container">
                    <p className="m-0 text-center text-white small">Copyright &copy; Aurelien Declimmer @ 2020</p>
                </div>
            </footer>
    </>
    )
};

export default HomePage;

