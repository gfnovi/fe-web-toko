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
import { check_roles } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
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
  const [avatar, setAvatar] = useState<File>();
  const avatarRef = useRef() as any;
  const [dataProduct, setDataProduct] = useState<ProductType>();
  const productId = new URLSearchParams(location.search).get("productId");
  const navigate = useNavigate();

  const roles = check_roles();

  useEffect(() => {
    if (roles === "admin") {
      const getProductId = (id: string) => {
        getData.getProductById(id).then((res) => {
          setDataProduct(res);
          setLoading(false);

          if (avatarRef.current !== "undefined") {
            avatarRef.current.src =
              `http://localhost:8000/api/images/` + res.image;
          }
        });
      };
      const getListCategory = () => {
        getData
          .getCategory()
          .then((res) => {
            setListCategory(res);
          })
          .then(() => {
            getProductId(productId);
          });
      };
      getListCategory();
    } else {
      navigate("/home");
    }
  }, [loading]);

  const saveUpdate = async () => {
    if (avatar === undefined) {
      const formData = new FormData();
      formData.append("image", dataProduct.image);
      formData.append("id", productId);
      formData.append("stock", dataProduct.stock.toString());
      formData.append("name", dataProduct.name);
      formData.append("price", dataProduct.price.toString());
      formData.append("category", dataProduct.category.id);
      await updateData
        .EditProduct(formData, productId)
        .then((res) => {
          swal("Edit Product", "succes edit product", "success");
        })
        .catch((err) => {
          swal("Edit Product", "error edit product", "error");
        });
    } else {
      const imageForm = new FormData();
      imageForm.append("file", avatar);
      await sendData.uploadImage(imageForm).then(async (res) => {
        const formData = new FormData();
        formData.append("image", res.filename);
        formData.append("id", productId);
        formData.append("stock", dataProduct.stock.toString());
        formData.append("name", dataProduct.name);
        formData.append("price", dataProduct.price.toString());
        formData.append("category", dataProduct.category.id);
        await updateData
          .EditProduct(formData, productId)
          .then((res) => {
            swal("Edit Product", "succes edit product", "success");
          })
          .catch((err) => {
            swal("Edit Product", "error edit product", "error");
          });
      });
    }
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
                defaultValue={dataProduct.name}
                type="text"
                className="form-control"
                onChange={(e) => {
                  setDataProduct({
                    ...dataProduct,
                    name: e.currentTarget.value,
                  });
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                defaultValue={dataProduct.category.id}
                className="form-control"
                onChange={(e) =>
                  setDataProduct({
                    ...dataProduct,
                    category: {
                      id: e.currentTarget.value,
                      name: e.currentTarget.id,
                    },
                  })
                }
              >
                {listCategory.map((cate) => (
                  <option id={cate.name} key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col">
                <label>Price</label>
                <input
                  defaultValue={dataProduct.price}
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setDataProduct({
                      ...dataProduct,
                      price: Number(e.currentTarget.value),
                    });
                  }}
                ></input>
              </div>
              <div className="col">
                <label>Stock</label>
                <input
                  defaultValue={dataProduct.stock}
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setDataProduct({
                      ...dataProduct,
                      stock: Number(e.currentTarget.value),
                    });
                  }}
                ></input>
              </div>
            </div>
            <div className="mb-3 pt-3">
              <button
                className=" btn btn-primary float-end"
                onClick={saveUpdate}
              >
                Save Update
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default EditProduct;
