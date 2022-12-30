import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { border } from "@mui/system";
import { right } from "@popperjs/core";
import React, { useContext, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

const Sidebar = () => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const signOut=()=>{
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <>
      <div className="sidebar">
        
              <ul>
                <NavLink to="/admin/dashboard">
                  <li>
                    Dashboard
                  </li>
                </NavLink>
                <NavLink to="/admin/orders">
                  <li>
                    Orders
                  </li>
                </NavLink>
                <li onClick={() => setOpenSetting(!openSetting)}>
                  Settings
                  {openSetting === true ? (
                    <span className="float-end">
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                  ) : (
                    <span className="float-end">
                      <FontAwesomeIcon icon={faCaretUp} />
                    </span>
                  )}
                  {openSetting === true ? (
                    <ul>
                      <NavLink to="/admin/settings/categories">
                        <li>Categories</li>
                      </NavLink>
                      <NavLink to="/admin/settings/products">
                        <li>Products</li>
                      </NavLink>
                      <NavLink to="/admin/settings/users">
                        <li>Users</li>
                      </NavLink>
                    </ul>
                  ) : (
                    <></>
                  )}
                </li>
                <NavLink to="/admin/orders">
                  
                <li onClick={signOut}>
                  Sign Out
                </li>
                </NavLink>
              </ul>
      </div>
    </>
  );
};

export default Sidebar;
