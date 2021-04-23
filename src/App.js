import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginNav from '../src/components/nav/loginNav';
import LogoutNav from '../src/components/nav/loguotNav';
import Register from './components/register/register';
import Login from './components/login/login';
import Reset from './components/reset/reset';
import Update from './components/update/update';
import Intro from './components/intro/intro';
import Home from './components/home/home';
import { useSelector, useDispatch } from "react-redux";

function App() {
  const user=useSelector((state)=>state.auth)
  const[isLogin,setIsLogin]=useState();
  // console.log(user);
  // console.log(isLogin);
  useEffect(()=>{
    setIsLogin(localStorage.getItem("user")||"")
  },[isLogin])
  
  return (
  // <Home/>
  <>
  {(user.isLoggedIn)?<LoginNav/>:<LogoutNav/>}
  </>
  );
}

export default App;
