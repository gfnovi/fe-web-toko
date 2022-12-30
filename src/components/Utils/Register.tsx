import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import sendData from "../../services/addData";

// const email_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Register = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const v2 = PWD_REGEX.test(pwd);

    if (!v2) {
      swal(
        "Register",
        "Password is not valid must contain Uppercase letter, lowercase letter, number, and minimal lenght = 8",
        "warning"
      );
    }
    if (pwd != matchPwd) {
      swal("Register", "Password is not match", "warning");
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", pwd);
      formData.append("address", address);
      sendData
        .signup(formData)
        .then((res) => {
          swal("Register", "Registration success", "success");
        })
        .catch((error) => {
          swal("resgister", error.message, "error");
        });
    }
  };

  return (
    <div className="wrapper-form">
      <div className="form-right">
        {/* <form className="form-right" onSubmit={handleSubmit}> */}
        <h2 className="text-uppercase">Registration form</h2>
        <div className="mb-3">
          <label>Your email</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="input-field"
          ></input>
        </div>
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="input-field"
          ></input>
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            id="address"
            autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
            className="input-field"
          ></input>
        </div>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <label>Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-describedby="pwdnote"
              className="input-field"
            ></input>
          </div>
          <div className="col-sm-6 mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              className="input-field"
            ></input>
          </div>
        </div>
        <div className="form-field">
          <button onClick={handleSubmit} className="register">
            Register
          </button>
        </div>
        <div className="form-field">
          <p>
            Already register ? <NavLink to="/">Sign In</NavLink>
          </p>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Register;
