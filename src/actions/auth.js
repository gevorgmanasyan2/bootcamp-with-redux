import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";
import axios from "axios";

const API_URL = "https://devcamp-api-node.herokuapp.com/api/v1/auth/";

export const register = (name, email, password, role) => (dispatch) => {
  return AuthService.register(name, email, password, role).then(
    (response) => {
      console.log(response);
      localStorage.setItem("userToken", response.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("errMessage");

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const reset = (email) => (dispatch) => {
  return AuthService.reset(email).then(
    (response) => {
      dispatch({
        type: RESET_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: RESET_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const update = (currentPassword,newPassword) => (dispatch) => {
  return AuthService.update(currentPassword,newPassword).then(
    (response) => {
      console.log(response);
      // dispatch({
      //   type: UPDATE_SUCCESS,
      // });

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: response.data,
      // });

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

      // dispatch({
      //   type: UPDATE_FAIL,
      // });

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });

      return Promise.reject();
    }
  );
};


 


 

export const updatePassword=(values)=>{
  const user=JSON.parse(localStorage.getItem('user')); 
  return async function update(dispatch){
    
      const response=axios.put(`https://devcamp-api-node.herokuapp.com/api/v1/auth/updatepassword`,values,
      
      {
          headers:{'Content-Type': 'application/json',
                    Authorization: `Bearer ${user}`,

          
      }})
      dispatch({type:'UPDATE_SUCCESS',payload:response})
  }
}

// export const updatePassword = (values) => {
//   console.log(values);
//   return async (dispatch) => {
//     // dispatch(start());
//     try {
//       const response = await axios.put(`${API_URL}updatepassword`, values, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user}`,
//           // "access-control-allow-origin": "*",
//         },
//       });
//       console.log(response);
//       // dispatch(success(values));
//     } catch (error) {
//       // dispatch(failure())
//       console.log("An error occurred.", error);
//     }
//   };
// };

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  console.log("something");
  dispatch({
    type: LOGOUT,
  });
};
