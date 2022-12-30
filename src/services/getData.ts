import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const getCategory=()=>{
    return axios.get(API_URL+"category").then((res)=>{
        return res.data
    })
}

const getProducts=()=>{
    return axios.get(API_URL+"product").then((res)=>{
        return res.data
    })
}

const getProductById=(id:string)=>{
    return axios.get(API_URL+"product/find/"+id).then((res)=>{
        return res.data
    })
}

const getListUser=()=>{
    return axios.get(API_URL+"user").then((res)=>{
        return res.data
    })
} 

const getUserbyId=(id:string)=>{
    return axios.get(API_URL+"user/find/"+id).then((res)=>{
        return res.data
    })
}

const getProductbyCategory=(id:string)=>{
    return axios.get(API_URL+"product/category="+id).then((res)=>{
        return res.data
    })
}

export default{
    getCategory,
    getProducts,
    getProductById,
    getListUser,
    getUserbyId,
    getProductbyCategory
}
