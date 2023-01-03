import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const parseJwt = (token:string) => {
  try {
     return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    return null;
  }
};
export const authHeader =() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
      return { Authorization: "Bearer " + user.token };

  } else {
    return {};
  }
};

  
 const check_roles =():string=>{
  if (user && user.roles) {
    return user.roles;
  } else {
    return null;
  }
}

const getUserId =():string=>{
  if (user && user.username) {
    return user.username;
  } else {
    return null;
  }
}

const check_token=()=>{
  const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.token);
      console.log(decodedJwt)
      if (decodedJwt.exp * 1000 < Date.now()) {
        return "expired"
      }else{
        return "not_expired"
      }
    }

}
export {
  check_token,
  check_roles ,
  getUserId
}