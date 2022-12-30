import axios from "axios";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Card, CardHeader, Col, Row } from "reactstrap";
import Sidebar from "../../Utils/Sidebar";
import getData from "../../../services/getData";
import sendData from "../../../services/addData";
import swal from "sweetalert";
import deleteData from "../../../services/deleteData";
import updateData from "../../../services/updateData";
import ListUser from "./ListUser";
import addData from "../../../services/addData";
import { check_roles } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [prov, setProv] = useState([]);
  const [city, setCity] = useState([]);
  const [addressProv, setaddressProv] = useState("");
  const [addressProvName, setaddressProvName] = useState("");
  const [orderCity, setorderCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const roles = check_roles();

  useEffect(() => {
    if (roles === "admin") {
      fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
        .then((response) => response.json())
        .then((provinces) => setProv(provinces));

        if(addressProv === ""){}else{
          fetch(
            "http://www.emsifa.com/api-wilayah-indonesia/api/regencies/" +
              addressProv +
              ".json"
          )
            .then((response) => response.json())
            .then((regencies) => setCity(regencies));
        }
      setLoading(false);
    } else {
      navigate("/home");
    }
  }, [loading,addressProv]);

  const saveData = async () => {
      const formData = new FormData();
      formData.append("address", address+" ,Kota: "+orderCity+" ,Provinsi: "+addressProvName);
      formData.append("password", Password);
      formData.append("name", firstName + " " + lastName);
      formData.append("email", email);
      await addData
        .addUser(formData)
        .then((res) => {
          swal("Add User", "Success Add User", "success");
          navigate('/admin/settings/users')
        })
        .catch((err) => {
          swal("Add User", "Failed Add User", "error");
        });
  };

  return (
    !loading && (
      <>
        <div className="container-fluid row ">
          <div
            className="col-3"
            style={{ borderRight: "1px solid black", minHeight: "100vh" }}
          >
            <Sidebar />
          </div>
          <div className="col-9">
            <h3 style={{ borderBottom: "1px solid black" }}>Add New User</h3>
            <div className="row">
              <div className="col">
                <label className="form-label">First Name</label>
                <input
                  value={firstName}
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setFirstName(e.currentTarget.value);
                  }}
                ></input>
              </div>
              <div className="col">
                <label className="form-label">Last Name</label>
                <input
                  value={lastName}
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setLastName(e.currentTarget.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="text"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                
              ></input>
            </div>
            <div className="row">
              <div className="col-sm-6 mb-3">
                <label>Province</label>
                <select
                  className="form-control"
                  value={addressProv}
                  onChange={(event) => {
                    const index = event.target.selectedIndex;
                    const el:any = event.target.childNodes[index]
                    const option =  el.getAttribute('id'); 
                    setaddressProv(event.target.value);
                    setaddressProvName(option)
                  }}
                >
                  <option hidden value=""></option>
                  {prov.map((provinsi) => (
                    <option key={provinsi.id} value={provinsi.id} id={provinsi.name}>
                      {provinsi.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6 mb-3">
                <label>City</label>
                <select
                  className="form-control"
                  id="sel1"
                  onChange={(event) => {
                    setorderCity(event.target.value);
                  }}
                >
                  <option hidden value=""></option>
                  {city.map((kota) => (
                    <option key={kota.id} value={kota.name}>
                      {kota.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label>Address Detail</label>
              <input
                type="text"
                id="address"
                autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="form-control"
                
              ></input>
            </div>
            <div className="row">
              <div className="col">
                <label>Password</label>
                <input
                  value={Password}
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="mb-3 pt-3">
              <button className=" btn btn-primary float-end" onClick={saveData}>
                Add User
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default AddUser;
