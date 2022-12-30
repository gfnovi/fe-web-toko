import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, Col, Row } from "reactstrap";
import Sidebar from "../../Utils/Sidebar";
import getData from "../../../services/getData";
import sendData from "../../../services/addData";
import swal from "sweetalert";
import deleteData from "../../../services/deleteData";
import updateData from "../../../services/updateData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenAlt,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { check_roles } from "../../../services/auth";

const Products = () => {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [Product, setProduct] = useState<string>("");
  const [ProductEdit, setProductEdit] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  const roles = check_roles();

  useEffect(() => {
    if (roles === "admin") {
      const getListProduct = () => {
        getData
          .getProducts()
          .then((res) => {
            setListProduct(res);
          })
          .then(() => {
            setLoading(false);
          });
      };
      getListProduct();
    } else {
      navigate("/home");
    }
  }, [loading]);

  const deleteProduct = (id: string) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);

        deleteData
          .deleteProduct(id)
          .then((res) => {
            swal("Delete Product", "Success Delete Product", "success");
            setProduct("");
            setLoading(false);
            setProductEdit("");
            setEdit(false);
          })
          .catch((err) => {
            swal("Delete Product", err, "error");
          });
      } else {
      }
    });
  };
  return (
    !loading && (
      <>
        <div className="container-fluid h-100">
          <div className="row h-100 justify-content-center">
            <div
              className="col-3"
              style={{ borderRight: "1px solid black", minHeight: "100vh" }}
            >
              <Sidebar />
            </div>
            <div className="col-9 ">
              <div className="row pt-3 container-fluid">
                <div className="col-4">
                  <h3>Products</h3>
                </div>
                <div className="col-4">&nbsp;</div>
                <div className="col-4">
                  <button
                    className="btn rounded btn-primary float-end"
                    onClick={() => navigate("/admin/settings/addProduct")}
                  >
                    Add New Product
                  </button>
                </div>
              </div>
              <div className="row container-fluid pt-3">
                <table className="table-bordered w-100">
                  <thead className="text-center">
                    <tr>
                      <th>Action</th>
                      <th>Product Name</th>
                      <th>Product Image</th>
                      <th>Price</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProduct.map((Product) => (
                      <tr key={Product.id}>
                        <td className="text-center">
                          <button
                            style={{
                              backgroundColor: "red",
                              border: "none",
                              borderRadius: "20px",
                            }}
                            onClick={() => deleteProduct(Product.id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                          &nbsp;
                          <button
                            style={{
                              backgroundColor: "blue",
                              border: "none",
                              borderRadius: "20px",
                            }}
                            onClick={() =>
                              navigate(
                                "/admin/settings/editProduct?productId=" +
                                  Product.id
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faPenAlt} />
                          </button>
                        </td>
                        <td className="text-center">
                          <img
                            src={`http://localhost:8000/api/images/${Product.image}`}
                            width={50}
                          ></img>
                        </td>
                        <td>{Product.name}</td>
                        <td>Rp. {Product.price}</td>
                        <td className="text-center">{Product.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default Products;
