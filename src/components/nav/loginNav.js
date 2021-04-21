import React, { useState, useEffect } from "react";
import Login from "../login/login";
import Intro from "../intro/intro";
import Update from "../update/update";
import Register from "../register/register";
import Home from "../home/home";
import "./nav.css";
import devcump from "../../public/images/Vector.png";
import line from "../../public/images/_.png";
import headImg from "../../public/images/headImg.png";
import poligon from "../../public/images/poligon.png";
import bodyImg from "../../public/images/body.png";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const LoginNav = (props) => {
  // const token = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();
  // console.log(token);
  const OnDropDown = () => {
    let content = document.getElementById("dropdown-content");
    if (
      window.getComputedStyle(content, null).getPropertyValue("display") ===
      "none"
    ) {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  };
  const OnLogOut = () => {
    dispatch(logout())
      // .then(() => {
      //   console.log("loginNavOnlogOutEventOK");
      // })
      // .catch((err) => {
      //   console.log("loginNavErr");
      // });
  };
  const UpdatePassword = () => {};

  return (
    <>
      <Router>
        <div className="rect">
          <div className="dev">
            <div className="devIcon">
              <img src={devcump} alt="icon" />
            </div>
            <div>
              <h4>DevCamper</h4>
            </div>
          </div>
          <div className="navLink">
            <div className="dropdownWraper" onClick={OnDropDown}>
              <div className="nav">
                <div className="accountIcon dropdown">
                  <img className="headIcon" src={headImg} alt="logo" />
                  <img className="bodyIcon" src={bodyImg} alt="logo" />
                </div>
              </div>
              <div className="nav">
                <div className="dropdown">
                  <h3 className="account">Account</h3>
                </div>
              </div>
              <div className="nav pol dropdown">
                <div>
                  <img className="poligon" src={poligon} alt="pic" />
                </div>
              </div>
              <div id="dropdown-content" className="non">
                <NavLink to="intro" exact className="nav">
                  <div className="logout">
                    <h4 onClick={OnLogOut}>Logout</h4>
                  </div>
                </NavLink>
                <NavLink to="update" exact className="nav">
                  <div className="updatePass">
                    <h4 onClick={UpdatePassword}>Update Password</h4>
                  </div>
                </NavLink>
              </div>
            </div>

            <NavLink to="intro" exact className="nav">
              <div>
                <img src={line} alt="line" />
              </div>
            </NavLink>
            <NavLink to="intro" exact className="nav">
              <div>
                <h3>Browse Bootcamps</h3>
              </div>
            </NavLink>
          </div>
        </div>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/update" component={Update}></Route>
          <Route path="/intro" component={Intro}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default LoginNav;
