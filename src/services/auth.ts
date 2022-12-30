const user = JSON.parse(localStorage.getItem("user"));


 const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      return { Authorization: "Bearer " + user.accessToken };
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
export {
  authHeader,
  check_roles ,
  getUserId
}