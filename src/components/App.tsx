import React, { useEffect, useState } from "react";
import Basket from "./forAdmin/User/ListUser";
import AddCategory from "./forAdmin/Category/AddCategory";
import Home from "./forUser/Home"
import Books from "./Books";
import BooksDetail from "./BooksDetail";
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

const App = () => {
  // type Basket = {
  //   id: number;
  //   book: any;
  //   price: number;
  //   quantity: number;
  // };

  // const [baskets, setBasket] = useState<Basket[]>([]);
  // useEffect(() => {
  //   axios
  //     .get(API_URL + "basket")
  //     .then((response) => {
  //       setBasket(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },[]);

  // const tot_qty = baskets.reduce(function (result, item) {
  //   return result + item.quantity;
  // }, 0);

  // const [values,setvalues]= useState<number>()
  
  // useEffect(()=>{
  //   setvalues(tot_qty)
  // },[tot_qty])


  
  return (
    <div className="App">
      {/* <basketContext.Provider value={{values,setvalues}}> */}
        <Routes>
          <Route path="/admin/dashboard" element={<News />} />
          <Route path="/admin/order" element={<Books />} />
          {/* <Route path="/admin/orders" element={<Home />} /> */}
          <Route path="/admin/settings/categories" element={<AddCategory />} />
          <Route path="/admin/settings/products" element={<Products />} />
          <Route path="/admin/settings/editProduct" element={<EditProduct />} />
          <Route path="/admin/settings/addProduct" element={<AddProduct />} />
          <Route path="/admin/settings/addUser" element={<AddUser/>} />
          <Route path="/admin/settings/editUser" element={<EditUser/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/settings/users" element={<ListUser />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      {/* </basketContext.Provider> */}
    </div>
  );
};

export default App;
