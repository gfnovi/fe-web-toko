
  import axios from "axios";

  const API_URL = "http://localhost:8000/api/";
  
  
  const EditCategory = (name: string, id:string)=>{
    return axios.put(API_URL+`category/edit/${id}`, {id:id,name:name}).then((res)=>{
      return res.data;

    })
  }

  const EditProduct = (data:FormData, id:string)=>{
    return axios.put(API_URL+`product/edit/${id}`, data).then((res)=>{
      return res.data;

    })
  }

  const EditUser = (data:FormData, id:string)=>{
    return axios.put(API_URL+`user/edit/${id}`, data).then((res)=>{
      return res.data;

    })
  }

  export default{
    EditCategory,
    EditProduct,
    EditUser
  }

