import React, { useState } from "react";
import "./login.css";
import login1 from "../../public/images/arrowLog.png";
import login2 from "../../public/images/arrowLog2.png";
import Home from "../home/home";
import AuthHeader from "../../services/auth-header";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Validation from '../validation';

const Login = (props) => {

  const isLogin = AuthHeader();
  
  const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.auth);
  // console.log(isLoggedIn);
  // const user=useSelector((state)=>state.auth)
  // const error = useSelector((state) => state.message);
  const [values, setValues] = useState({ email: "", password: "" });
  // const [loading, setLoading] = useState(false);
  // console.log(values.password);
// console.log(user);
  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
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
  
  
  const Reset = () => {
    props.history.push('./reset');
  };
  // console.log(error);
  // console.log(loading);
  const SendDataToBackend = () => {
    // for (const key in error) {
    //   if (error[key] !== "") {
    //     return;
    //   }     
    // }
    console.log("OK");
    const{email,password}=values;
    console.log(email,password);
    console.log(values);
    dispatch(login(email,password))
      .then(() => {
        // setLoading(true);
      })
      .catch(() => {
        // setLoading(false);
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
            <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {       
        const errors=Validation(values)        
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}      
     >
       {({ isSubmitting}) => (
         <Form>
           <div className="inpts">
           <label className="fLabel">Email Address</label>
              <br />
              <Field  className="inp" type="email" name="email" placeholder="Current Password"
           onKeyUp={handleChange} required autoComplete="off" />
           <ErrorMessage className="is-danger" name="email" component="div" />
           </div>
           <div className="inpts">
           <label className="fLabel">Password</label>
              <br />
              <Field  className="inp" type="password" name="password" placeholder="Current Password"
           onKeyUp={handleChange} required autoComplete="off" />
           <ErrorMessage className="is-danger" name="password" component="div" />
           </div>
           <div className="inpButton">
           <button className="formBtn" type="submit" disabled={isSubmitting} onClick={SendDataToBackend}>
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
