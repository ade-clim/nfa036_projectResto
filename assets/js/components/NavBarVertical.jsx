import React from 'react';
import {Link, NavLink} from "react-router-dom";

const NavBarVertical = ({toto}) => {
  return (

      <div className="col-md-2 d-none d-md-block bg-danger sidebar vertical-nav">
          <div className="container">
              <ul className="nav flex-column mt-3">
                  <li className="">
                      <NavLink to={"/card"} className="nav-link text-white text-uppercase">
                          Nos offres
                      </NavLink>
                  </li>
                  <li className="  ">
                      <Link to={"/card/burgers"} className="nav-link text-white text-uppercase" >
                          Burgers
                      </Link>
                  </li>
                  <li className="  ">
                      <Link to={"/card/snacks"} className="nav-link text-white text-uppercase" >
                          Snacks
                      </Link>
                  </li>
                  <li className=" ">
                      <Link to={"/card/boissons"} className="nav-link text-white text-uppercase" >
                          Boissons
                      </Link>
                  </li>
                  <li className=" ">
                      <Link to={"/card/desserts"} className="nav-link text-white text-uppercase" >
                          Desserts
                      </Link>
                  </li>
                  <li className=" ">
                      <Link to={"/card/menu-enfants"} className="nav-link text-white text-uppercase" >
                          Menu enfants
                      </Link>
                  </li>
                  <li className=" ">
                      <Link to={"/card/others"} className="nav-link text-white text-uppercase" >
                          Others
                      </Link>
                  </li>
              </ul>
          </div>
      </div>
  )
};

export default NavBarVertical;