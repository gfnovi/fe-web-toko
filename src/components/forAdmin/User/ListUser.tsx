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

const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [User, setUser] = useState<string>("");
  const [UserEdit, setUserEdit] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  const roles = check_roles();

  useEffect(() => {
    if (roles === "admin") {
      
    const getListUser = () => {
      getData
        .getListUser()
        .then((res) => {
          setListUser(res);
        })
        .then(() => {
          setLoading(false);
        });
    };
    getListUser();
    } else {
      navigate("/home");
    }
  }, [loading]);


  const deleteUser = (id: string) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);

        deleteData
          .deleteUser(id)
          .then((res) => {
            swal("Delete User", "Success Delete User", "success");
            setUser("");
            setLoading(false);
            setUserEdit("");
            setEdit(false);
          })
          .catch((err) => {
            swal("Delete User", err, "error");
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
                  <h3>Users</h3>
                </div>
                <div className="col-4">&nbsp;</div>
                <div className="col-4">
                  <button
                    className="btn rounded btn-primary float-end"
                    onClick={() => navigate("/admin/settings/addUser")}
                  >
                    Add New User
                  </button>
                </div>
              </div>
              <div className="row container-fluid pt-3">
                <table className="table-bordered w-100">
                  <thead className="text-center">
                    <tr>
                      <th>Action</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUser.map((User) => (
                      <tr key={User.id}>
                        <td className="text-center">
                          <button
                            style={{ backgroundColor: "red", border: "none", borderRadius:'20px' }}
                            onClick={() => deleteUser(User.id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                          &nbsp;
                          <button
                            style={{ backgroundColor: "blue", border: "none", borderRadius:'20px' }}
                            onClick={() =>
                              navigate(
                                "/admin/settings/editUser?UserId=" +
                                  User.id
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faPenAlt} />
                          </button>
                        </td>
                        <td className="text-center">{User.name}</td>
                        <td>{User.email}</td>
                        <td>{User.address}</td>
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
export default Users;
