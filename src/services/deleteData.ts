
  import axios from "axios";
import { authHeader } from "./auth";

  const API_URL = "http://localhost:8000/api/";
  
  const deleteCategory = (id:string)=>{
    return axios.delete(API_URL+`category/delete/${id}`).then((res)=>{
      return res.data;

    })
  }
  const deleteProduct = (id:string)=>{
    return axios.delete(API_URL+`product/delete/${id}`).then((res)=>{
      return res.data;

    })
  }

  const deleteUser = (id:string)=>{
    return axios.delete(API_URL+`user/delete/${id}`).then((res)=>{
      return res.data;

    })
  }

  const deleteCart = (id:string)=>{
    return axios.delete(API_URL+`cart/delete/${id}`, {headers:authHeader()}).then((res)=>{
      return res.data;

    })
  }

export default{
    deleteCategory,
    deleteProduct,
    deleteUser,
    deleteCart
}