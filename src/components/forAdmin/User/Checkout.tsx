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
return(
    !loading &&(
        <>
        </>
    )
)
}