import { faSignOut, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { border } from "@mui/system";
import { right } from "@popperjs/core";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { basketContext } from "../../context/contextProduct";
const Header = () => {
  const closeNav = () => {};

  const {values,setvalues}= useContext(basketContext)
  
  const signOut=()=>{
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link">Disabled</a>
        </li>
      </ul>
      <span>
        
        <FontAwesomeIcon icon={faSignOut} onClick={signOut}/>
        
      </span>
    </div>
  </div>
</nav>
    </>
  );
};

export default Header;