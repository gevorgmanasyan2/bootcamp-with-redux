import axios from "axios";

const API_URL = "https://devcamp-api-node.herokuapp.com/api/v1/auth/";

const register = (name, email, password,role) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    role,
  },{
    headers:{'Content-Type':'application/json'}
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    },{
      headers:{'Content-Type':'application/json'}
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("login", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};
const reset=(email)=>{
  return axios.post(API_URL+"forgotpassword",{email},
  {
    headers:{'Content-Type':'application/json'}
  }
  )
};
 const update=(currentPassword,newPassword)=>{
  const user = JSON.parse(localStorage.getItem('login'));
  
   return axios.put(API_URL+"updatepassword",{
     currentPassword,
     newPassword
   },
   {
    headers:{'Content-Type':'application/json',
  "Authorization":`Bearer ${(user && user.token)?user.token:null}`
  }
  }
   )
 } 

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  reset,
  update,
};