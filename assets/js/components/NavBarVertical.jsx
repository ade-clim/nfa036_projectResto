import React from 'react';
import {Link, NavLink} from "react-router-dom";

const NavBarVertical = () => {
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
                      <a className="nav-link text-white text-uppercase" href="#">
                          Menus
                      </a>
                  </li>
                  <li className="  ">
                      <Link to={"/card/burgers"} className="nav-link text-white text-uppercase" >
                          Burgers
                      </Link>
                  </li>
                  <li className=" ">
                      <Link to={"/card/2"} className="nav-link text-white text-uppercase" >
                          Boissons
                      </Link>
                  </li>
                  <li className=" ">
                      <a className="nav-link text-white text-uppercase" href="#">
                          Reports
                      </a>
                  </li>
                  <li className=" ">
                      <a className="nav-link text-white text-uppercase" href="#">
                          Integrations
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  )
};

export default NavBarVertical;