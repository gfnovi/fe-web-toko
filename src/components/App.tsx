import React, { useEffect, useState } from "react";
import Basket from "./forAdmin/User/ListUser";
import AddCategory from "./forAdmin/Category/AddCategory";
import Home from "./forUser/Home"
import News from "./News";
import Products from "./forAdmin/Product/Products";
import "../styles.scss";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constant";
import { basketContext } from "../context/contextProduct";
import Login from './Utils/Login'
import Register from './Utils/Register'
import Header from './forUser/Header'
import Footer from './Footer'
import Sidebar from "./Utils/Sidebar";
import EditProduct from "./forAdmin/Product/EditProduct";
import AddProduct from "./forAdmin/Product/AddProduct";
import ListUser from "./forAdmin/User/ListUser"
import AddUser from "./forAdmin/User/AddUser";
import EditUser from "./forAdmin/User/EditUser";
import Cart from "./forUser/Cart";

const App = () => {
  
  return (
    <div className="App">
      {/* <basketContext.Provider value={{values,setvalues}}> */}
        <Routes>
          <Route path="/admin/dashboard" element={<News />} />
          <Route path="/admin/settings/categories" element={<AddCategory />} />
          <Route path="/admin/settings/products" element={<Products />} />
          <Route path="/admin/settings/editProduct" element={<EditProduct />} />
          <Route path="/admin/settings/addProduct" element={<AddProduct />} />
          <Route path="/admin/settings/addUser" element={<AddUser/>} />
          <Route path="/admin/settings/editUser" element={<EditUser/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/settings/users" element={<ListUser />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      {/* </basketContext.Provider> */}
    </div>
  );
};

export default App;
