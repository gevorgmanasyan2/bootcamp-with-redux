import React, { useState,useEffect } from "react";
import "./reset.css";
import { useDispatch } from "react-redux";
import { reset } from "../../actions/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Validation from "../validation";

const Reset = (props) => {
  useEffect(()=>{
    alert("Sorry\n\n You can not reset your password\n\n Api call from here is not working!!!!!")
  },[])
  
  const dispatch = useDispatch();
  const [values, setValues] = useState({ email: "" });
  const [error, setError] = useState({ email: "" });
  
  const handleChange = (e) => {
    setValues({ email: e.target.value });
  };

  const BackToLogin = () => {
    props.history.push("./login");
  };

  const SendDataToBackend = () => {
    if (error.email === "" || error.email) {
      return;
    } else {
      dispatch(reset(values.email))
        .then(() => {})
        .catch(() => {});
    }
  };
  return (
    <>
      <div className="reset">
        <div className="resetForm">
          <h4
            style={{ color: "#E05433", margin: "0", cursor: "pointer" }}
            onClick={BackToLogin}
          >
            Back to login
          </h4>
          <h1>Reset Password</h1>
          <h4>
            Use this form to reset your password using the registered email
            address.
          </h4>
          <Formik
            initialValues={{ email: "" }}
            validate={(values) => {
              const errors = Validation(values);
              setError({ email: errors.email });
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
                  <label className="resetLabel">Email Address</label>
                  <br />
                  <Field
                    className="resetInp"
                    type="email"
                    name="email"
                    placeholder="Enter address"
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
                <div>
                  <button
                    className="resetButton"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={SendDataToBackend}
                  ></button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Reset;
