import axios from "axios";
import { authHeader } from "./auth";
const API_URL = "http://localhost:8000/";

const login = (email: string, password: string) => {
    return axios
      .post(API_URL + "auth/signin", { email: email, password: password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  const signup=(data:FormData)=>{
    return axios.post(API_URL+"auth/signup", data, { headers: authHeader() }).then((res)=>{
      return res.data;

    })
  }

  const AddCategory = (name: string)=>{
    return axios.post(API_URL+"api/category/create", {name:name}, { headers: authHeader() }).then((res)=>{
      return res.data;

    })
  }

  const uploadImage = (image:any)=>{
    return axios.post(API_URL+"api/uploadImage", image).then((res)=>{
      return res.data;
    })
  }

  const addProduct=(data:FormData)=>{
    return axios.post(API_URL+"api/product/create", data, { headers: authHeader() }).then((res)=>{
      return res.data;

    })
  }

  const addUser=(data:FormData)=>{
    return axios.post(API_URL+"api/user/create", data, { headers: authHeader() }).then((res)=>{
      return res.data;

    })
  }

  const addCart=(data:FormData)=>{
    return axios.post(API_URL+"api/cart/create", data, { headers: authHeader() }).then((res)=>{
      return res.data;

    })
  }

  const addTransaction=(data:FormData)=>{
    return axios.post(API_URL+"api/transaction/create", data, { headers: authHeader() }).then((res)=>{
      return res.data;

    })
  }
export default{
    login,
    signup,
    AddCategory,
    uploadImage,
    addProduct,
    addUser,
    addCart,
    addTransaction
}
