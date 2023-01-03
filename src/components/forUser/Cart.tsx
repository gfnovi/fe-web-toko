import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import swal from "sweetalert";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getData from "../../services/getData";
import Header from "./Header";
import deleteData from "../../services/deleteData";
import { check_token } from "../../services/auth";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [Carts, setCart] = useState([]);
  const userId = new URLSearchParams(location.search).get("userId");
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const cek_token = check_token()
  useEffect(() => {
    if(cek_token ==='expired'){
      
    localStorage.removeItem("user");
    window.location.href = "/";
    }else{

      getData
      .getCartByUserId(userId)
      .then((res) => {
        setCart(res);
        setLoading(false);

      })
      .catch((err) => {
        swal(err.message, 'failed', 'error')
      })
    }
  }, [loading]);

  const totalPrice = Carts.reduce(function (result, item) {
    return result + item.product.price * item.quantity;
  }, 0);

  const changeQuantity = (qty: number, value: any) => {};

  const deleteProduct = (cartId: any) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this order!",
      icon: "warning",
      buttons: ["Cancel", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteData
          .deleteCart(cartId)
          .then((res) => {
            swal("Your Product has been delete", {
              icon: "success",
            });
          })
          .catch((err) => {
            swal("Your Product not delete", {
              icon: "error",
            });
          });
      } else {
      }
    });
  };

  return (
    !loading && (
      <>
        <Header />
        <div className="m-1">
          <div>
            <h3>Cart list</h3>
          </div>
          <div className="table-responsive">
            <table className="table  table-striped table-light">
              <thead>
                <tr>
                  <th scope="col">Delete</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {Carts.map((Cart) => (
                  <tr key={Cart.id}>
                    <td>
                      <i
                        className="col-sm-1 bi-trash col text-start"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteProduct(Cart.id)}
                      ></i>
                    </td>
                    <td>{Cart.product.name}</td>
                    <td>
                      <input
                        className="col-sm-1 text-center"
                        type="number"
                        id="input-qty"
                        defaultValue={Cart.quantity}
                        onBlur={(event) => {
                          changeQuantity(Number(event.target.value), Cart);
                        }}
                      ></input>
                    </td>
                    <td>Rp. {Cart.quantity * Cart.product.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    Total Price
                  </td>
                  <td>Rp. {totalPrice}</td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  );
};

export default Cart;
