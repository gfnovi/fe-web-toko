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
import addData from "../../services/addData";
import updateData from "../../services/updateData";
const Cart = () => {
  const [Carts, setCart] = useState([]);
  const userId = new URLSearchParams(location.search).get("userId");
  const navigate = useNavigate();
  const [listProvince, setListProvince] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [listShipping, setListShipping] = useState([]);
  const [addressProv, setaddressProv] = useState("");
  // const [addressProvName, setaddressProvName] = useState("");
  const [orderCity, setorderCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const cek_token = check_token();
  const [courierOrder, setCourierOrder] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [phoneNumber, setPhoneNumber]= useState("")
  const totalPrice = Carts.reduce(function (result, item) {
    return result + item.product.price * item.quantity;
  }, 0);

  const totalWeight = Carts.reduce(function (result, item) {
    return result + item.product.weight * item.quantity;
  }, 0);
  useEffect(() => {
    if (cek_token === "expired") {
      localStorage.removeItem("user");
      window.location.href = "/";
    } else {
      getData
        .getCartByUserId(userId)
        .then((res) => {
          setCart(res);
          getProvince();
        })
        .catch((err) => {
          swal(err.message, "failed", "error");
        });
    }
  }, [loading]);

  const getProvince = () => {
    getData
      .getProvince()
      .then((res) => {
        setListProvince(res);
      })
      .then(() => {
        setLoading(false);
      });
  };
  const getListCity = (provinceId: string) => {
    getData.getCity(provinceId).then((res) => {
      setListCity(res);
    });
  };

  const changeQuantity = (qty: number, productId: any) => {
    const formData = new FormData();

    formData.append("product", productId);
    formData.append("quantity", qty.toString());
    formData.append("user", userId);
    updateData
      .editCart(formData)
      .then((res) => {
        swal("Add Cart", "Success edit to cart", "success");
        setLoading(false);
      })
      .catch((err) => {
        swal("Add Cart", "Failed edit to cart", "error");
        setLoading(false);
      });
  };

  const getShipping = (courier: string) => {
    const formData = new FormData();
    formData.append("courier", courier);
    formData.append("weight", totalWeight);
    formData.append("destination", orderCity);
    formData.append("origin", "501");
    getData.getShipping(formData).then((res) => {
      setListShipping(res[0].costs);
    });
  };

  const handleCheckout=()=>{
    const formData = new FormData()
    formData.append('shippingFee', shippingFee)
    formData.append('user', userId)
    console.log(Carts)
    for (var i = 0; i < Carts.length; i++) {
      formData.append('items', Carts[i].id);
    }
    formData.append('total_price', totalPrice);
    formData.append('recipient_name', name)
    formData.append('recipient_phone', phoneNumber)
    formData.append('shippingAddress', address)
    addData.addTransaction(formData).then((res)=>{
      const close= document.getElementById('closeModalCheckout')
      close.click()
      swal('Checkout','Success Checkout Items', 'success')
      getData
        .getCartByUserId(userId)
        .then((res) => {
          setCart(res);
          getProvince();
        })
        .catch((err) => {
          swal(err.message, "failed", "error");
        });
        

    }).catch((err)=>{
      swal('Checkout','Failes Checkout Items', 'failes')


    })
  }
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
                  <th>Weight</th>
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
                        onChange={(event) => {
                          changeQuantity(
                            Number(event.target.value),
                            Cart.product.id
                          );
                          setLoading(true);
                        }}
                      ></input>
                    </td>
                    <td>
                      {(Cart.quantity * Cart.product.weight).toString()} Kg
                    </td>
                    <td>Rp. {Cart.quantity * Cart.product.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Total Price
                  </td>
                  <td>Rp. {totalPrice}</td>
                </tr>
                <tr>
                  <td colSpan={5}>
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
        {/* <!-- Modal --> */}
        <div
          className="modal fade "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Checkout Form
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{height:'400px', overflow:"auto"}}>
                <div className="row">
                  <div className="col">
                    <label className="form-label">Name</label>
                    <input
                      value={name}
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setName(e.currentTarget.value);
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
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
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
                        getListCity(event.target.value);
                        // setaddressProvName(option);
                      }}
                    >
                      <option hidden value=""></option>
                      {listProvince.map((provinsi) => (
                        <option
                          key={provinsi.province_id}
                          value={provinsi.province_id}
                          id={provinsi.province}
                        >
                          {provinsi.province}
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
                      {listCity.map((kota) => (
                        <option key={kota.city_id} value={kota.city_id}>
                          {kota.city_name}
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
                  <div className="col-sm-6 mb-3">
                    <label>Choose Shipping</label>
                    <select
                      className="form-control"
                      value={courierOrder}
                      onChange={(event) => {
                        setCourierOrder(event.currentTarget.value);
                        getShipping(event.currentTarget.value);
                      }}
                    >
                      {orderCity === "" && addressProv === "" ? (
                        <></>
                      ) : (
                        <>
                          <option hidden value=""></option>
                          <option value="tiki">Tiki</option>
                          <option value="jne">JNE</option>
                          <option value="pos">POS Indonesia</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label>Shipping Type</label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        setShippingFee(event.currentTarget.value);
                      }}
                    >
                      <option hidden value=""></option>

                      {listShipping.map((type, index) => (
                        <option
                          key={index}
                          value={type.cost[0].value}
                          id={type.service}
                        >
                          {type.service} - {type.cost[0].value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <p>Detail Pesanan</p>
                  {Carts.map((cart)=>(
                    <ul key={cart.id}>
                      <li>{cart.product.name} {cart.quantity}item - Rp. {cart.quantity * cart.product.price}</li>
                    </ul>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id='closeModalCheckout'
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Cart;
