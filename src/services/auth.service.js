import axios from "axios";
import AuthHeader from "./auth-header";

const usertoken = AuthHeader();
const API_URL = "https://devcamp-api-node.herokuapp.com/api/v1/auth/";

const register = (userInputs) => {
  console.log(userInputs);
  return axios.post(API_URL + "register", userInputs, {
    headers: { "Content-Type": "application/json" },
  });
};

const login = (userInputs) => {
  return axios
    .post(API_URL + "login", userInputs, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const reset = (email) => {
  return axios.post(API_URL + "forgotpassword", email, {
    headers: { "Content-Type": "application/json" },
  });
};

const update = (userInputs) => { 
  return axios.put(API_URL + "updatepassword", userInputs, {
    headers: {
      "Content-Type": "application/json",
      Authorization: usertoken,     
    },
  });
};

const logout = () => {
  return axios
    .get(API_URL + "logout", { headers: { Authorization: usertoken } })
    .then(() => {
      localStorage.removeItem("user");
    })
    .catch((err) => {});
};

export default {
  register,
  login,
  logout,
  reset,
  update,
};
