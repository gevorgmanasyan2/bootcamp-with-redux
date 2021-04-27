import React, { useState, useEffect } from "react";
import "./App.css";
import LoginNav from "../src/components/nav/loginNav";
import LogoutNav from "../src/components/nav/loguotNav";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState();
  useEffect(() => {
    setIsLogin(localStorage.getItem("user") || "");
  }, [isLogin]);

  return (
    // <Home/>
    <>{user.isLoggedIn ? <LoginNav /> : <LogoutNav />}</>
  );
}

export default App;
