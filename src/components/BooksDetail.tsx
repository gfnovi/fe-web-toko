import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
import { API_URL } from "../utils/constant";
import { basketContext } from "../context/contextProduct";


const BooksDetail = (props: any) => {
  const location = useLocation();
  const data = location.state;
  const {values,setvalues} = useContext(basketContext)
  // ADD TO BASKET
  const toBasket = (value: object) => {
    const data = Object.values(value)["0"];
    axios
      .get(API_URL + "basket?book.id=" + data.id)
      .then((response) => {
        if (response.data.length === 0) {
          const dataBasket = {
            quantity: 1,
            price: data.price,
            book: data,
          };
          axios
            .post(API_URL + "basket", dataBasket)
            .then((res) => {
              swal({
                title: "Success",
                text: "You add this book to the basket!",
                icon: "success",
              });
            })
            .catch((error) => {
              alert("failed!");
            });
        } else {
          const dataBasket = {
            quantity: response.data[0].quantity + 1,
            price: response.data[0].price + data.price,
            book: data,
          };
          axios
            .put(API_URL + "basket/" + response.data[0].id, dataBasket)
            .then((res) => {
              swal({
                title: "Success",
                text: "You add this book to the basket!",
                icon: "success",
              });
            })
            .catch((error) => {
              alert("failed!");
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="">
      <div className="container py-3">
  {/* <!-- Card Start --> */}
  <div className="card card-detail">
    <div className="row ">

      <div className="col-md-7 px-3">
        <div className="card-block px-6">
          <h4 className="card-title">{data["book-name"]}</h4>
          <p className="card-text">
            Rp. {data['price']}
            </p>
            <p>{data['category']['genre']}</p>
          <p className="card-text">
            description
          </p>
          <br/>
          <button
              type="button"
              className="btn btn-primary mt-auto"
              onClick={() => {toBasket({ data }); setvalues(values+1)}}
            >
              Add to Cart
            </button>
        </div>
      </div>
      {/* <!-- Carousel start --> */}
      <div className="col-md-5">
      <img src={data["book-cover"]} width="80%" className="d-block"></img>

      </div>
    </div>
  </div>

</div>
    </div>
  );
};

export default BooksDetail;
