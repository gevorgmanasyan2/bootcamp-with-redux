import React, { useState } from "react";
import "./update.css";
import { useDispatch } from "react-redux";
import { update } from "../../actions/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Validation from "../validation";


const Update = (props) => {
  const dispatch = useDispatch(); 
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState({
    currentPasswordERR: "",
    newPasswordERR: "",
    confirmNewPasswordERR: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const SendDataToBackend = () => {
    const { currentPassword, newPassword } = values;
    const { currentPasswordERR, newPasswordERR, confirmNewPasswordERR } = error;
    if (currentPasswordERR === "" || newPasswordERR || confirmNewPasswordERR) {
      return;
    } else {
      dispatch(update(currentPassword, newPassword)).then(() => {
        props.history.push("../home");
      });
    }
  };
  return (
    <>
      <div className="update">
        <div className="updateForm">
          <h1 className="updateHeader">Update Password</h1>
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            validate={(values) => {             
              const errors = Validation(values);
              setError({
                currentPasswordERR: errors.currentPassword,
                newPasswordERR: errors.newPassword,
                confirmNewPasswordERR: errors.confirmNewPassword,
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
                <div className="updateItem">
                  <label className="updateLabel">Current Password</label>
                  <br />
                  <Field
                    className="updateInp"
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    onKeyUp={handleChange}
                    required
                    autoComplete="off"
                  />
                  <ErrorMessage
                    className="is-danger"
                    name="currentPassword"
                    component="div"
                  />
                </div>
                <div className="updateItem">
                  <label className="updateLabel">New Password</label>
                  <br />
                  <Field
                    className="updateInp"
                    type="password"
                    name="newPassword"
                    placeholder="Current Password"
                    onKeyUp={handleChange}
                    required
                    autoComplete="off"
                  />
                  <ErrorMessage
                    className="is-danger"
                    name="newPassword"
                    component="div"
                  />
                </div>
                <div className="updateItem">
                  <label className="updateLabel">Confirm New Password</label>
                  <br />
                  <Field
                    className="updateInp"
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Current Password"
                    onKeyUp={handleChange}
                    required
                    autoComplete="off"
                  />
                  <ErrorMessage
                    className="is-danger"
                    name="confirmNewPassword"
                    component="div"
                  />
                </div>
                <div className="updateBtn">
                  <button
                    className="updateBtnInp"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={SendDataToBackend}
                  >
                    Update Password
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

export default Update;
