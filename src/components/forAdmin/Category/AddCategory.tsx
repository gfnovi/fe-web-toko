import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, Col, Row } from "reactstrap";
import Sidebar from "../../Utils/Sidebar";
import getData from "../../../services/getData";
import sendData from "../../../services/addData";
import swal from "sweetalert";
import deleteData from "../../../services/deleteData";
import updateData from "../../../services/updateData";
import { check_roles } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
const Events = () => {
  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [categoryEdit, setCategoryEdit] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const inputCategory = useRef();
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

  const addCategory = () => {
    sendData
      .AddCategory(category)
      .then((res) => {
        setLoading(false);
        swal("Add Category", "success add category", "success");
        setCategory("");
      })
      .catch((err) => {
        swal("Add Category", err, "error");
      });
  };

  const EditCategory = () => {
    updateData
      .EditCategory(category, categoryEdit)
      .then((res) => {
        setLoading(false);
        swal("Edit Category", "success Edit category", "success");
        setCategory("");
        setCategoryEdit("");
        setEdit(false);
      })
      .catch((err) => {
        swal("Edit Category", err, "error");
      });
  };

  const DeleteCategory = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);

        deleteData
          .deleteCategory(categoryEdit)
          .then((res) => {
            swal("Delete Category", "Success Delete category", "success");
            setCategory("");
            setLoading(false);
            setCategoryEdit("");
            setEdit(false);
          })
          .catch((err) => {
            swal("Delete Category", err, "error");
          });
      } else {
      }
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
            <h3 style={{ borderBottom: "1px solid black" }}>Categories</h3>
            <Row>
              {listCategory.map((category) => (
                <Col
                  sm={3}
                  md={4}
                  xl={4}
                  lg={4}
                  key={category.id}
                  className="pt-2"
                >
                  <Card
                    onClick={(e) => {
                      setEdit(true);
                      setCategory(category.name);
                      setCategoryEdit(category.id);
                    }}
                  >
                    <CardHeader>{category.name}</CardHeader>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="row pt-3">
              {edit === false ? (
                <>
                  <div className="col-3">
                    <input
                      type="text"
                      ref={inputCategory}
                      value={category}
                      onChange={(e) => setCategory(e.currentTarget.value)}
                      placeholder="add category"
                    ></input>
                  </div>
                  <div className="col-3">
                    <button
                      className="rounded w-100"
                      onClick={() => {
                        setLoading(true);
                        addCategory();
                      }}
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                      }}
                    >
                      Add Category
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-3">
                    <input
                      type="text"
                      ref={inputCategory}
                      value={category}
                      onChange={(e) => setCategory(e.currentTarget.value)}
                      placeholder="add category"
                    ></input>
                  </div>
                  <div className="col-3">
                    <button
                      className="rounded w-100"
                      onClick={() => {
                        setLoading(true);
                        EditCategory();
                      }}
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                      }}
                    >
                      Edit Category
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      className="rounded w-100"
                      onClick={() => {
                        DeleteCategory();
                      }}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                      }}
                    >
                      Delete Category
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default Events;
