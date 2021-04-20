import React, {useState} from 'react';
import './reset.css';
import {useSelector,useDispatch} from 'react-redux';
import {reset} from '../../actions/auth';



const Reset=(props)=>{
    const dispatch=useDispatch();
    const error=useSelector(state=>state.message);

    const[values,setValues]=useState({email:""});
    const[loading,setLoading]=useState(false)
   
console.log(error);
    const OnChange=(e)=>{
       setValues({email:e.target.value})
    }
    const onBlur=(e)=>{
        dispatch({type:'SET_MESSAGE_EMAIL',payload:e.target.value})
    }
    const BackToLogin=()=>{
        props.history.push('./login');
    }
    const SendData=()=>{
        
    }
    console.log(loading);
    const SendDataToBackend=()=>{
        for (const key in error) {      
            if(error[key]!==""){
                   return
            }
            console.log("OK");
       dispatch(reset(values.email))
       .then(() => {
        setLoading(true);
      })
      .catch(() => {
        setLoading(false);
      });
    } 
    }
    return(
        <>
       
        <div className="reset">
            <div className="resetForm">
              <h4 style={{color:"#E05433",margin:"0",cursor:"pointer"}} onClick={BackToLogin}>Back to login</h4>
              <h1>Reset Password</h1>
              <h4>Use this form to reset your password using the registered email address.</h4>
              <div>
                  <label className="resetLabel">Enter Email</label><br/>
                  <input className="resetInp" type="email" name="email" placeholder="Enter address"
                    onChange={OnChange} onBlur={onBlur} required autoComplete="off" />
                    <p className="is-danger">{error.message_email}</p>
              </div>
              <button className="resetButton" type="button" onClick={SendDataToBackend} onClickCapture={SendData}></button>
            </div>
        </div>

        </>
    )
}

export default Reset;