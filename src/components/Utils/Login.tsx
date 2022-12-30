import axios from "axios";
import { API_URL } from "../../utils/constant";
import swal from "sweetalert";
import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import sendData from "../../services/addData";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const loginSubmit = async (e: any) => {
    e.preventDefault();
    const login = await sendData.login(email, password).catch((error) => {
      swal(error.message, "Login failed !", "error");
    });
    if (login?.token) {
      swal("Login User", "Login success !", "success", { timer: 1000 }).then(
        () => {
          if (login.roles === "admin") {
            navigate("/admin/settings/products");
          } else {
            navigate("/home");
          }
        }
      );
    }
  };

  return (
    <div className="container py-3">
      <div className="rounded d-flex justify-content-center">
        <div className="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div className="text-center">
            <h3 className="text-primary">Sign In</h3>
          </div>
          <form action="">
            <div className="p-4">
              <div className="input-group mb-3">
                <span className="input-group-text bg-primary">
                  <i className="bi bi-person-plus-fill text-white"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text bg-primary">
                  <i className="bi bi-key-fill text-white"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                      loginSubmit(e)
                    }
                  }}
                ></input>
              </div>
              <button
                className="btn btn-primary text-center mt-2"
                onClick={loginSubmit}
              >
                Login
              </button>
              <p className="text-center mt-5">
                Don't have an account?
                <span className="text-primary">
                  <NavLink to="/register">Sign Up</NavLink>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
