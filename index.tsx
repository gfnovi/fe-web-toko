import React from "react";
import ReactDOM from "react-dom";
import App from "./src/components/App";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.scss";
import { BrowserRouter } from "react-router-dom";
import "./src/styles.scss";
import News from "./src/components/forAdmin/Product/EditProduct";

import OwlCarousel from "react-owl-carousel";

import {AuthProvider} from './src/context/AuthProvider'
ReactDOM.render(
  <BrowserRouter>
  <AuthProvider>
      <App />
      </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
