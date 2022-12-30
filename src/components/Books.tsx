import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constant";
import swal from "sweetalert";
import { basketContext } from "../context/contextProduct";
import { productContext } from "../context/contextProduct";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const Books = () => {
  const { values, setvalues } = useContext(basketContext);
  const { listValue, setListValue } = useContext(productContext);

  type Book = {
    id: number;
    "book-code": string;
    "book-name": string;
    is_ready: boolean;
    price: number;
    "book-cover": any;
    category: any;
  };
  type Category = {
    id: number;
    genre: string;
  };

  type Basket = {
    id: number;
    book: any;
    price: number;
    quantity: number;
  };

  const [products, setProductList] = useState<Book[]>([]);
  const [categories, setCategoriesList] = useState<Category[]>([]);
  const [clickedGenre, setClickedGenre] = useState<string>("fiction");
  // const booksDetail = createContext<Book>(null)
  // SHOW FIRST PAGE BOOKS
  useEffect(() => {
    axios
      .get(API_URL + "products?category.genre=" + clickedGenre)
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // axios
    // .get(API_URL + "products")
    // .then((response) => {
    //   setListValue(response.data)
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    // Show Caterogy
    axios
      .get(API_URL + "categories")
      .then((response) => {
        setCategoriesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ADD TO BASKET
  const toBasket = (value: object) => {
    const data = Object.values(value)["0"];
    axios
      .get(API_URL + "basket?book.id=" + data.id)
      .then((response) => {
        console.log(response.data);
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
              swal({
                title: "Failed",
                text: "can't add this book to the basket",
                icon: "error",
              });
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
              swal({
                title: "Failed",
                text: "can't add this book to the basket",
                icon: "error",
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-2">
            <ul className="list-group list-group-flush">
              {categories.map((category) => (
                <li
                  className={`list-group-item ${
                    active == category && "active"
                  }`}
                  key={category.id}
                  id={category.genre}
                  onClick={(event) => {
                    setActive(category);
                    event.preventDefault();
                    const li: HTMLLIElement = event.currentTarget;

                    setClickedGenre(li.id);
                    axios
                      .get(API_URL + "products?category.genre=" + li.id)
                      .then((response) => {
                        setProductList(response.data);
                      })
                      .catch((error) => {
                        console.log(error);
                      }),
                      [clickedGenre];
                  }}
                >
                  {category.genre}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-10">
            <Row>
              {products.map((product) => (
                <Col md={4} lg={4} sm={4} xs={6} key={product["id"]}>
                  <Card
                    onClick={(event) => {
                      navigate("/booksdetail", { state: product });
                    }}
                  >
                    <CardHeader>{product["book-name"]}</CardHeader>
                    <CardBody>
                      <img src={product["book-cover"]} width="90px"></img>
                      <br />
                      <p>Rp. {product["price"]}</p>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(event) => {
                          event.stopPropagation();
                          toBasket({ product }),
                            setvalues(values + 1),
                            console.log(values);
                        }}
                      >
                        Add to Cart
                      </button>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
