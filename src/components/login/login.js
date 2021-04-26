import React, { useState } from "react";
import "./login.css";
import login1 from "../../public/images/arrowLog.png";
import login2 from "../../public/images/arrowLog2.png";
import Home from "../home/home";
import AuthHeader from "../../services/auth-header";
import { useDispatch } from "react-redux";
import { loginToken } from "../../actions/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Validation from "../validation";

const Login = (props) => {
  const isLogin = AuthHeader(); 
  const dispatch = useDispatch();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const Reset = () => {
    props.history.push("./reset");
  };

  const SendDataToBackend = (errors) => {
    const { email, password } = values;
    const userInputs={ email, password };
    const emailErr = error.email;
    const passwordErr = error.password;
    if (emailErr || passwordErr) {
      return;
    } else {     
      dispatch(loginToken(userInputs))
        .then(() => {})
        .catch(() => {});
    }
  };

  return (
    <>
      {isLogin === "" ? (
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
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = Validation(values);
                setError({ email: errors.email, password: errors.password });
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="inpts">
                    <label className="fLabel">Email Address</label>
                    <br />
                    <Field
                      className="inp"
                      type="email"
                      name="email"
                      placeholder="Current Password"
                      onKeyUp={handleChange}
                      required
                      autoComplete="off"
                    />
                    <ErrorMessage                      
                      className="is-danger"
                      name="email"
                      component="div"
                    />
                  </div>
                  <div className="inpts">
                    <label className="fLabel">Password</label>
                    <br />
                    <Field
                      className="inp"
                      type="password"
                      name="password"
                      placeholder="Current Password"
                      onKeyUp={handleChange}
                      required
                      autoComplete="off"
                    />
                    <ErrorMessage                      
                      className="is-danger"
                      name="password"
                      component="div"
                    />
                  </div>
                  <div className="inpButton">
                    <button
                      className="formBtn"
                      type="submit"
                      disabled={isSubmitting}
                      onClick={SendDataToBackend}
                    >
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

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
