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
import { data } from "jquery";

const EditUser = () => {
  type user = {
    name: string;
    email: string;
    address: string;
    password: string;
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [Password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<user>();

  const [prov, setProv] = useState([]);
  const [city, setCity] = useState([]);
  const [addressProv, setaddressProv] = useState("");
  const [addressProvName, setaddressProvName] = useState("");
  const [AddressCity, setAddressCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [changePassword, setChangePassword]=useState<boolean>(false)
  const roles = check_roles();
  const userId = new URLSearchParams(location.search).get("UserId");
  useEffect(() => {
    if (roles === "admin") {
      fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
        .then((response) => response.json())
        .then((provinces) => {
          setProv(provinces);
          getUser();
        });

      if (addressProv === "") {
      } else {
        fetch(
          "http://www.emsifa.com/api-wilayah-indonesia/api/regencies/" +
            addressProv +
            ".json"
        )
          .then((response) => response.json())
          .then((regencies) => setCity(regencies));
      }
      const getUser = () => {
        getData
          .getUserbyId(userId)
          .then((res) => {
            setDataUser(res);
            if (typeof res.address.split(" ,Kota: ")[1] !== "undefined") {
              setAddressCity(
                res.address.split(" ,Kota: ")[1].split(" ,Provinsi: ")[0]
              );
              setAddress(res.address.split(" ,Kota: ")[0]);
              setaddressProvName(
                res.address.split(" ,Kota: ")[1].split(" ,Provinsi: ")[1]
              );

              const indexProvinsi = prov.find(
                (item) =>
                  item.name ===
                  res.address.split(" ,Kota: ")[1].split(" ,Provinsi: ")[1]
              );
              if (typeof indexProvinsi === "undefined") {
              } else {
                const indexKota = prov.find(
                  (item) =>
                    item.name ===
                    res.address.split(" ,Kota: ")[1].split(" ,Provinsi: ")[0]
                );
                setaddressProv(indexProvinsi.id);
                setAddressCity(indexKota);
              }
            }else{
              setAddress(res.address)
            }
          })
          .then((res) => {
            setLoading(false);
          });
      };
    } else {
      navigate("/home");
    }
  }, [loading, addressProv]);

  const saveData = async () => {
    const formData = new FormData();
    formData.append("id", userId)
    formData.append(
      "address",
      address + " ,Kota: " + AddressCity + " ,Provinsi: " + addressProvName
    );
    if(Password !== ""){
      formData.append("password", Password);
    }
    formData.append("name", dataUser.name);
    formData.append("email", dataUser.email);
    await updateData
      .EditUser(formData, userId)
      .then((res) => {
        swal("Edit User", "Success Edit User", "success");
        navigate("/admin/settings/users");
      })
      .catch((err) => {
        swal("Edit User", "Failed Edit User", "error");
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
            <h3 style={{ borderBottom: "1px solid black" }}>Edit User</h3>
            <div className="row">
              <div className="col">
                <label className="form-label">Name</label>
                <input
                  defaultValue={dataUser.name}
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setDataUser({ ...dataUser, name: e.currentTarget.value });
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
                onChange={(e) => {
                  setDataUser({ ...dataUser, email: e.currentTarget.value });
                  console.log(addressProv);
                }}
                defaultValue={dataUser.email}
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
                    const el: any = event.target.childNodes[index];
                    const option = el.getAttribute("id");
                    setaddressProv(event.target.value);
                    setaddressProvName(option);
                  }}
                >
                  <option hidden value=""></option>
                  {prov.map((provinsi) => (
                    <option
                      key={provinsi.id}
                      value={provinsi.id}
                      id={provinsi.name}
                    >
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
                  value={AddressCity}
                  onChange={(event) => {
                    setAddressCity(event.target.value);
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
                defaultValue={address}
                className="form-control"
              ></input>
            </div>
            <div className="row">
              <div className="col">
                <label style={{cursor:'pointer', color:'blue'}}onClick={()=>setChangePassword(!changePassword)}>Change Password ? </label>
                <input
                  value={Password}
                  type="text"
                  placeholder="Enter new password"
                  className={changePassword===true?"form-control":"hide"}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="mb-3 pt-3">
              <button className=" btn btn-primary float-end" onClick={saveData}>
                Update User
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default EditUser;
