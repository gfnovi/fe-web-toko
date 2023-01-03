import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import getData from "../../services/getData";
import Header from "./Header";
import { check_roles,check_token,getUserId } from "../../services/auth"
import addData from "../../services/addData";

const Home = () => {
  type Category = {
    id: string;
    name: string;
  };

  type Basket = {
    id: number;
    book: any;
    price: number;
    quantity: number;
  };

  const [products, setProductList] = useState([]);
  const [categories, setCategoriesList] = useState<Category[]>([]);
  const [clickedGenre, setClickedCategory] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // const HomeDetail = createContext<Book>(null)
  // SHOW FIRST PAGE Home
  const roles = check_roles();
  const userId = getUserId()
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const cek_token = check_token()
  useEffect(() => {
    if(cek_token ==='expired'){
    localStorage.removeItem("user");
    window.location.href = "/";
    }else{
      getData
      .getCategory()
      .then((response) => {
        setCategoriesList(response);
        setActive(response[0].id)
        getData
          .getProductbyCategory(response[0].id)
          .then((res) => {
            setProductList(res);
          })
          .then((res) => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    
    }
  }, [loading]);

  const getProductByCate = (category_id: string) => {
    getData
      .getProductbyCategory(category_id)
      .then((res) => {
        setProductList(res);
      })
      .then((res) => {
        setLoading(false);
      });
  };


  const addToCart =(productId:string)=>{
    const formData = new FormData()
    
    formData.append("product", productId);
    formData.append("quantity", "1");
    formData.append("user",userId );
    addData.addCart(formData).then((res)=>{
      swal('Add Cart', 'Success added to cart','success')
    }).catch((err)=>{
      swal('Add Cart', 'Failed added to cart','error')

    })

  }
  return (
    !loading && (
      <>
      <Header/>
        <div>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-lg-2">
                <ul className="list-group list-group-flush">
                  {categories.map((category) => (
                    <li
                      className={`list-group-item ${
                        active === category.id && "active"
                      }`}
                      key={category.id}
                      id={category.id}
                      onClick={(event) => {
                        setActive(category.id);
                        event.preventDefault();
                        const li: HTMLLIElement = event.currentTarget;
                        getProductByCate(li.id);
                      }}
                    >
                      {category.name}
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
                          navigate("/Homedetail", { state: product });
                        }}
                      >
                        <CardHeader>{product["book-name"]}</CardHeader>
                        <CardBody>
                          <img
                            src={`http://localhost:8000/api/images/${product.image}`}
                            height="90px"
                          ></img>
                          <br />
                          <p>Rp. {product["price"]}</p>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(event) => {
                              event.stopPropagation();
                              addToCart(product.id)
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
      </>
    )
  );
};

export default Home;
