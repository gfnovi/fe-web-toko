import {
  faCartShopping,
  faSignOut,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { border } from "@mui/system";
import { right } from "@popperjs/core";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { basketContext } from "../../context/contextProduct";
import { getUserId } from "../../services/auth";
const Header = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userid, setUserid] = useState("");
  const closeNav = () => {};
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserid(user.username);
    if(userid === null){
      setLoading(true)
    }else{
      setLoading(false)
    }
  });

  const { values, setvalues } = useContext(basketContext);

  const signOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    !loading &&
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to={`/cart?userId=${userid}`} className="nav-link">
                  {/* <a className="nav-link"> */}
                  <FontAwesomeIcon icon={faCartShopping} />
                  {/* </a> */}
                </NavLink>
              </li>
            </ul>
            <span>
              <FontAwesomeIcon icon={faSignOut} onClick={signOut} />
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
