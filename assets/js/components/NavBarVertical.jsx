import React from 'react';
import {Link, NavLink} from "react-router-dom";

const NavBarVertical = () => {
  return (
      <nav className="col-md-2 d-none d-md-block bg-danger sidebar vertical-nav">
          <div className="sidebar-sticky">
              <ul className="nav flex-column text-right mt-3">
                  <li className="nav-item">
                      <NavLink to={"/card"} className="nav-link active text-white">
                          <span data-feather="home"></span>
                          Dashboard <span className="sr-only">(current)</span>
                      </NavLink>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link text-white" href="#">
                          <span data-feather="file"></span>
                          Menus
                      </a>
                  </li>
                  <li className="nav-item">
                      <Link to={"/card/1"} className="nav-link text-white" >
                          <span data-feather="shopping-cart"></span>
                          Burgers
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/card/2"} className="nav-link text-white" >
                          <span data-feather="users"></span>
                          Boissons
                      </Link>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link text-white" href="#">
                          <span data-feather="bar-chart-2"></span>
                          Reports
                      </a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link text-white" href="#">
                          <span data-feather="layers"></span>
                          Integrations
                      </a>
                  </li>
              </ul>
          </div>
      </nav>
  )
};

export default NavBarVertical;