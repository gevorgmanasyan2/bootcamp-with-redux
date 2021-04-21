import React, { useState } from "react";
import "./login.css";
import login1 from "../../public/images/arrowLog.png";
import login2 from "../../public/images/arrowLog2.png";
import Home from "../home/home";
import AuthHeader from "../../services/auth-header";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/auth";

const Login = (props) => {
  const isLogin = AuthHeader();
  console.log(isLogin);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  const user=useSelector((state)=>state.auth)
  const error = useSelector((state) => state.message);
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
console.log(user);
  const OnChange = (e) => {
    switch (e.target.name) {
      case "email":
        setValues({ ...values, email: e.target.value });
        break;
      case "password":
        setValues({ ...values, password: e.target.value });
        break;

      default:
        break;
    }
  };
  const onBlur = (e) => {
    switch (e.target.name) {
      case "email":
        dispatch({ type: "SET_MESSAGE_EMAIL", payload: e.target.value });
        break;
      case "password":
        dispatch({ type: "SET_MESSAGE_LOGIN_PASSWORD", payload: e.target.value });
        break;

      default:
        break;
    }
  };

  const SendData = (event) => {};
  const Reset = () => {
    props.history.push('./reset');
  };
  console.log(error);
  console.log(loading);
  const SendDataToBackend = () => {
    for (const key in error) {
      if (error[key] !== "") {
        return;
      }     
    }
    console.log("OK");
    dispatch(login(values.email, values.password))
      .then(() => {
        setLoading(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {(isLogin==="")? (
        <div className="loginForm">
          <div className="logForn">
            <div className="loginHeader">
              <div className="loginLog">
                <img className="logImg1" src={login1} alt="arrow" />
                <img className="logImg2" src={login2} alt="arrow" />
              </div>
              <div>
                <h1>Login</h1>
              </div>
            </div>
            <div className="formText">
              <h5>
                Log in to list your bootcamp or rate, review and favorite
                bootcamps
              </h5>
            </div>
            <div className="inpts">
              <label className="fLabel">Email Address</label>
              <br />
              <input
                className="inp"
                type="email"
                name="email"
                onChange={OnChange}
                onBlur={onBlur}
                placeholder="Enter Email"
                autoComplete="off"
                value={values.email || ""}
                required
              />
              <p className="is-danger">{error.message_email}</p>
            </div>
            <div className="inpts">
              <label className="fLabel">Password</label>
              <br />
              <input
                className="inp"
                type="password"
                name="password"
                onChange={OnChange}
                onBlur={onBlur}
                placeholder="Enter Password"
                autoComplete="off"
                value={values.password || ""}
                required
              />
              <p className="is-danger">{error.message_password}</p>
            </div>
            <div className="inpButton">
              <button
                className="formBtn"
                type="submit"
                onClick={SendDataToBackend}
                onClickCapture={SendData}
              >
                Login
              </button>
            </div>

            <div className="formFooter">
              <div>
                <h5>Forgot Password?</h5>
              </div>

              <div>
                <h5
                  style={{ color: "#E05433", textDecoration: "none" }}
                  onClick={Reset}
                >
                  Reset Password
                </h5>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Login;
