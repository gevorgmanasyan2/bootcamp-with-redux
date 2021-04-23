import React, { useState } from "react";
import regIcon from "../../public/images/regIcon.png";
import "./register.css";
import { useDispatch } from "react-redux";
import { register } from "../../actions/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Validation from "../validation";

const Register = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "user",
  });
  const [error, setError] = useState({
    errname: "",
    erremail: "",
    errpassword: "",
    errconfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onBlur = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const SendDataToBackend = (e) => {
    const { name, email, password, role } = values;
    const { errname, erremail, errpassword, errconfirm } = error;
    if (errname === "" || erremail || errpassword || errconfirm) {
      return;
    } else {
      dispatch(register(name, email, password, role))
        .then(() => {
          props.history.push("./login");
        })
        .catch(() => {});
    }
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
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirm: "",
              role: "",
            }}
            validate={(values) => {
              const errors = Validation(values);
              setError({
                errname: errors.name,
                erremail: errors.email,
                errpassword: errors.password,
                errconfirm: errors.confirm,
              });
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
                  <label>Email Address</label>
                  <br />
                  <Field
                    className="inp"
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    required
                    autoComplete="off"
                    onKeyUp={handleChange}
                  />
                  <ErrorMessage
                    className="is-danger"
                    name="name"
                    component="div"
                  />
                </div>
                <div className="regInputs">
                  <label>Email Address</label>
                  <br />
                  <Field
                    className="inp"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                    autoComplete="off"
                    onKeyUp={handleChange}
                  />
                  <ErrorMessage
                    className="is-danger"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="regInputs">
                  <label>Password</label>
                  <br />
                  <Field
                    className="inp"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    required
                    autoComplete="off"
                    onKeyUp={handleChange}
                  />
                  <ErrorMessage
                    className="is-danger"
                    name="password"
                    component="div"
                  />
                </div>
                <div className="regInputs">
                  <label>Confirm Password</label>
                  <br />
                  <Field
                    className="inp"
                    type="password"
                    name="confirm"
                    placeholder="Confirm password"
                    required
                    autoComplete="off"
                    onKeyUp={handleChange}
                  />
                  <ErrorMessage
                    className="is-danger"
                    name="confirm"
                    component="div"
                  />
                </div>
                <div className="regRadio">
                  <label>User Role</label>
                  <br />
                  <Field
                    className="radioinp"
                    type="radio"
                    name="role"
                    id="userrole"
                    value="user"
                    checked
                    onBlur={onBlur}
                    onKeyUp={handleChange}
                  />
                  <p>Regular User (Browse, Write reviews, etc)</p>
                  <br />
                  <Field
                    className="radioinp"
                    type="radio"
                    name="role"
                    id="publisherrole"
                    value="publisher"
                    onBlur={onBlur}
                    onKeyUp={handleChange}
                  />
                  <p>Bootcamp Publisher</p>
                  <ErrorMessage
                    className="is-danger"
                    name="role"
                    component="div"
                  />
                </div>
                <div className="validationError">
                  <p>
                    * You must be affiliated with the bootcamp in some way in
                    order to add it to DevCamper.
                  </p>
                </div>

                <div>
                  <button
                    className="regButton"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={SendDataToBackend}
                  >
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
