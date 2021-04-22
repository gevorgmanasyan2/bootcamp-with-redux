import axios from "axios";

const API_URL = "https://devcamp-api-node.herokuapp.com/api/v1/auth/";

const register = (name, email, password, role) => {
  return axios.post(
    API_URL + "register",
    {
      name,
      email,
      password,
      role,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  // .then((response) => {
  //   if (response.data.token) {
  //     localStorage.setItem("user", JSON.stringify(response.data.token));
  //   }
  //   return response.data;
  // });
};

const login = (email, password) => {
  return axios
    .post(
      API_URL + "login",
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const reset = (email) => {
  return axios.post(
    API_URL + "forgotpassword",
    { email },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};



const update = (currentPassword,newPassword) => {
  const user=JSON.parse(localStorage.getItem('user')); 
     
      return axios.put(`https://devcamp-api-node.herokuapp.com/api/v1/auth/updatepassword`,{currentPassword,newPassword},
    
      {
          headers:{'Content-Type': 'application/json',
                    Authorization: `Bearer ${user}`,          
      }})
      // dispatch({type:'UPDATE_SUCCESS',payload:response})
 
};



const logout = () => {
  const user = localStorage.getItem("user");
  console.log("userTocenBefore", user);
  return axios
    .get(API_URL + "logout", { headers: { Authorization: `Bearer ${user}` } })
    .then(() => {
      localStorage.removeItem("user");
    })
    .catch((err) => {});
  console.log("userTokenAfter", user);
};

export default {
  register,
  login,
  logout,
  reset,
  update,
};
