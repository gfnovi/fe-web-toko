import axios from "axios";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Card, CardHeader, Col, Row } from "reactstrap";
import Sidebar from "../../Utils/Sidebar";
import getData from "../../../services/getData";
import sendData from "../../../services/addData";
import swal from "sweetalert";
import deleteData from "../../../services/deleteData";
import updateData from "../../../services/updateData";
import Products from "./Products";
import addData from "../../../services/addData";
import { check_roles } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  type ProductType = {
    name: string;
    id: string;
    category: {
      id: string;
      name: string;
    };
    image: string;
    stock: number;
    price: number;
  };
  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<File>(null);
  const avatarRef = useRef() as any;
  const [stockProduct, setstockProduct] = useState<string>("");
  const [nameProduct, setnameProduct] = useState<string>("");
  const [priceProduct, setpriceProduct] = useState<string>("");
  const [weightProduct, setweightProduct] = useState<string>("");
  const [categoryProduct, setcategoryProduct] = useState<string>("");
  const navigate = useNavigate();

  const roles = check_roles();

  useEffect(() => {
    if (roles === "admin") {
      const getListCategory = () => {
        getData
          .getCategory()
          .then((res) => {
            setListCategory(res);
          })
          .then(() => {
            setLoading(false);
          });
      };
      getListCategory();
    } else {
      navigate("/home");
    }
  }, [loading]);

  const saveData = async () => {
    const imageForm = new FormData();
    imageForm.append("file", avatar);
    await sendData.uploadImage(imageForm).then(async (res) => {
      const formData = new FormData();
      formData.append("image", res.filename);
      formData.append("stock", stockProduct);
      formData.append("name", nameProduct);
      formData.append("price", priceProduct);
      formData.append("category", categoryProduct);
      formData.append("weight", weightProduct);
      await addData
        .addProduct(formData)
        .then((res) => {
          swal("Add Product", "Success Add product", "success");
        })
        .catch((err) => {
          swal("Add Product", "Failed Add product", "error");
        });
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
            <h3 style={{ borderBottom: "1px solid black" }}>Edit Product</h3>
            <div className="row">
              <div className="col-lg-2">
                <img alt="avatar" style={{ width: "118px" }} ref={avatarRef} />
              </div>
              <div className="col-lg-4 my-auto">
                <span className=" p-0 m-0">Upload profile image</span>
                <br />
                <label
                  htmlFor="avatar"
                  className="color-white form-label rounded  p-2"
                  style={{
                    border: "1px solid black",
                    backgroundColor: "blue",
                    cursor: "pointer",
                  }}
                >
                  Click to upload
                </label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  style={{ visibility: "hidden" }}
                  onChange={(event) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(event.target.files[0]);
                    reader.onloadend = () => {
                      avatarRef.current.src = reader.result.toString();
                    };
                    setAvatar(event.target.files[0]);
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                value={nameProduct}
                type="text"
                className="form-control"
                onChange={(e) => {
                  setnameProduct(e.currentTarget.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                onChange={(e) => setcategoryProduct(e.currentTarget.value)}
                value={categoryProduct}
              >
                <option hidden>--Select Category--</option>
                {listCategory.map((cate) => (
                  <option id={cate.id} key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col">
                <label>Price</label>
                <input
                  value={priceProduct}
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setpriceProduct(e.currentTarget.value);
                  }}
                ></input>
              </div>
              <div className="col">
                <label>Stock</label>
                <input
                  value={stockProduct}
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setstockProduct(e.currentTarget.value);
                  }}
                ></input>
              </div>
              <div className="col">
                <label>Weight (in kg)</label>
                <input
                  value={weightProduct}
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setweightProduct(e.currentTarget.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="mb-3 pt-3">
              <button className=" btn btn-primary float-end" onClick={saveData}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default AddProduct;
