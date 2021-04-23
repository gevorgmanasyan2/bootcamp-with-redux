import React, { useState } from "react";
import regIcon from "../../public/images/regIcon.png";
import "./register.css";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../actions/auth";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Validation from '../validation';

const Register = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.message);
const regMessage=useSelector(state=>state.auth.registeredUser);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "user",
  });
  const [successful, setSuccessful] = useState(false);
  const [radioCheck, setRadioCheck] = useState("user");

  const OnChange = (e) => {
    switch (e.target.name) {
      case "name":
        setValues({ ...values, name: e.target.value });
        break;
      case "email":
        setValues({ ...values, email: e.target.value });
        break;
      case "password":
        setValues({ ...values, password: e.target.value });
        break;
      case "confirm":
        setValues({ ...values, confirm: e.target.value });
        break;
      case "role":
        setValues({ ...values, role: e.target.value });
        setRadioCheck(e.target.value);
        break;

      default:
        break;
    }
  };
  const onBlur = (e) => {
    // switch (e.target.name) {
    //   case "name":
    //     dispatch({ type: "SET_MESSAGE_NAME", payload: e.target.value });
    //     break;
    //   case "email":
    //     dispatch({ type: "SET_MESSAGE_EMAIL", payload: e.target.value });
    //     break;
    //   case "password":
    //     dispatch({ type: "SET_MESSAGE_PASSWORD", payload: e.target.value });
    //     break;
    //   case "confirm":
    //     dispatch({ type: "SET_MESSAGE_CONFIRM", payload: e.target.value });
    //     break;
    //   case "role":
    //     dispatch({ type: "SET_MESSAGE_CHECKED", payload: e.target.value });
    //     setRadioCheck(e.target.value);
    //     break;

    //   default:
    //     break;
    // }
  };
  
  const SendDataToBackend = (e) => {    
    for (const key in error) {
      if (error[key] !== "") {
        return;
      }
    }    
    dispatch(register(values.name, values.email, values.password, values.role))
    .then((res)=>{
      setSuccessful(true);        
        props.history.push("./login");
    })
    .catch((err)=>{
      setSuccessful(false);       
    })

  };
  return (
    <>
      <div className="register">
        <div className="registerForm">
          <div className="registerHeader">
            <div>
              <img src={regIcon} alt="icon" />
            </div>
            <div className="regHead">
              <h1>Register</h1>
            </div>
          </div>
          <div className="regText">
            <h4>
              Register to list your bootcamp or rate, review and favorite
              bootcamps
            </h4>
          </div>
          <Formik
       initialValues={{name:'', email: '', password: '', confirm:'',role:'' }}
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
       {({ isSubmitting }) => (
         <Form>
           <div className="regInputs">
           <label >Email Address</label>
              <br />
           <Field  className="inp" type="text" name="name" placeholder="Enter Full Name"
           required autoComplete="off" OnChange={OnChange} />
           <ErrorMessage className="is-danger" name="name" component="div" />
           </div>
           <div className="regInputs">
           <label >Email Address</label>
              <br />
           <Field  className="inp" type="email" name="email" placeholder="Enter Email"
           required autoComplete="off" OnChange={OnChange} />
           <ErrorMessage className="is-danger" name="email" component="div" />
           </div>
           <div className="regInputs">
           <label>Password</label>
              <br />
           <Field className="inp" type="password" name="password" placeholder="Enter Password"
           required autoComplete="off" OnChange={OnChange} />
           <ErrorMessage className="is-danger" name="password" component="div" />
           </div>
           <div className="regInputs">
           <label>Confirm Password</label>
              <br />
           <Field className="inp" type="password" name="confirm" placeholder="Confirm password"
           required autoComplete="off" OnChange={OnChange} />
           <ErrorMessage className="is-danger" name="confirm" component="div" />
           </div>
           <div className="regRadio">
           <label >User Role</label>
              <br />
           <Field className="radioinp" type="radio" name="role" id="userrole" value="user" OnChange={OnChange}/>
           <p>Regular User (Browse, Write reviews, etc)</p>
           <br/>
           <Field className="radioinp" type="radio" name="role"  id="publisherrole" value="publisher" OnChange={OnChange}/>
           <p>Bootcamp Publisher</p>           
           <ErrorMessage className="is-danger" name="role" component="div" />
           </div>
           <div className="validationError">
            <p>
              * You must be affiliated with the bootcamp in some way in order to
              add it to DevCamper.
            </p>
          </div>
           
           <div >
           <button className="regButton" type="submit" disabled={isSubmitting} onClick={SendDataToBackend} >
           Register
           </button>
           </div>
           
         </Form>
       )}
     </Formik>
     
    
        </div>
      </div>
    </>
  );
};

export default Register;
