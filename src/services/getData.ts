import axios from "axios";
import {authHeader } from "./auth";

const API_URL = "http://localhost:8000/api/";

const getCategory=()=>{
    return axios.get(API_URL+"category", { headers: authHeader() }).then((res)=>{
        return res.data
    })
}

const getProducts=()=>{
    return axios.get(API_URL+"product", { headers: authHeader() }).then((res)=>{
        return res.data
    })
}

const getProductById=(id:string)=>{
    return axios.get(API_URL+"product/find/"+id, { headers: authHeader() }).then((res)=>{
        return res.data
    })
}

const getListUser=()=>{
    return axios.get(API_URL+"user", { headers: authHeader() }).then((res)=>{
        return res.data
    })
} 

const getUserbyId=(id:string)=>{
    return axios.get(API_URL+"user/find/"+id, { headers: authHeader() }).then((res)=>{
        return res.data
    })
}

const getProductbyCategory=(id:string)=>{
    return axios.get(API_URL+"product/category="+id, { headers: authHeader() }).then((res)=>{
        return res.data
    })
}

const getCartByUserId=(UserId:string)=>{
    return axios.get(API_URL+"cart/find/"+UserId, { headers: authHeader() }).then((res)=>{
        return res.data
    })
}

export default{
    getCategory,
    getProducts,
    getProductById,
    getListUser,
    getUserbyId,
    getProductbyCategory,
    getCartByUserId
}
