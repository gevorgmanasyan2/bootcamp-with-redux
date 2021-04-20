import React, {useState} from 'react';
import regIcon from '../../public/images/regIcon.png';
import './register.css';
import {useSelector,useDispatch} from 'react-redux';
import {register} from '../../actions/auth';
import validate from '../validation';


const Register=(props)=>{

const dispatch=useDispatch();
const error=useSelector(state=>state.message)

const[values,setValues]=useState({name:"",email:"",password:"",confirm:"",role:"user"});
const[successful,setSuccessful]=useState(false);
const[radioCheck,setRadioCheck]=useState("user");
    
    const OnChange=(e)=>{        
      switch (e.target.name) {
        case "name":
            setValues({...values, name:e.target.value})                    
            break;
        case "email":
            setValues({...values, email:e.target.value})                     
            break;
        case "password":
            setValues({...values, password:e.target.value})            
            break;   
            case "confirm":
              setValues({...values, confirm:e.target.value})              
              break;   
              case "role":
                setValues({...values, role:e.target.value})
                setRadioCheck(e.target.value)                
                break;     
                     
        default:
            break;
    }   
    
    }   
    const onBlur=(e)=>{      
      
        switch (e.target.name) {
          case 'name':
            dispatch({type:'SET_MESSAGE_NAME',payload:e.target.value})                 
            break;
            case 'email':
              dispatch({type:'SET_MESSAGE_EMAIL',payload:e.target.value})                            
            break;
            case 'password':
              dispatch({type:'SET_MESSAGE_PASSWORD',payload:e.target.value})                           
            break;
            case 'confirm':
              dispatch({type:'SET_MESSAGE_CONFIRM',payload:e.target.value})                            
            break;
            case 'role':
              dispatch({type:'SET_MESSAGE_CHECKED',payload:e.target.value}) 
              setRadioCheck(e.target.value)                           
            break;        
            
          default:
            break;
        }
    }
    
//     console.log("error", error);   
//  const SendData=()=>{   
//   console.log(values); 
//   console.log(successful); 
                          
//    }

   const SendDataToBackend=(e)=>{
    //  e.preventDefault()
    for (const key in error) {      
      if(error[key]!==""){
             return
      }
      console.log("OK");
      dispatch(register(values.name,values.email,values.password,values.role))
    .then(() => {
     setSuccessful(true);
   })
   .catch(() => {
     setSuccessful(false);
   });
     }  
    

  }
    return(
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
         <h4>Register to list your bootcamp or rate, review and favorite bootcamps</h4>
     </div>
     <div className="regInputs">
        <label>Name</label><br/>
        <input type="text" name="name" placeholder="Enter Full Name" onChange={OnChange} onBlur={onBlur}   required autoComplete="off" />        
        <p className="is-danger">{error.message_name}</p>
     </div>
     <div className="regInputs">
     <label>Email Address</label><br/>
        <input type="email" name="email" placeholder="Enter Email" onChange={OnChange} onBlur={onBlur} required autoComplete="off" />        
        <p className="is-danger">{error.message_email}</p>
     </div>
     <div className="regInputs">
     <label>Password</label><br/>
        <input type="password" name="password" placeholder="Enter Password" onChange={OnChange} onBlur={onBlur} required autoComplete="off" />        
        <p className="is-danger">{error.message_password}</p>
     </div>
     <div className="regInputs">
     <label>Confirm Password</label><br/>
        <input type="password" name="confirm" placeholder="Confirm Password" onChange={OnChange} onBlur={onBlur} required autoComplete="off" />       
        <p className="is-danger">{error.message_confirm}</p>
     </div>
     <div className="regRadio">
        <label>User Role</label><br/>
        <input type="radio" id="userrole" name="role" value="user" checked={radioCheck==="user"} onChange={OnChange} onBlur={onBlur}/>
        <p>Regular User (Browse, Write reviews, etc)</p>
        <p className="is-danger">{error.message_checked}</p>
        <br/>
        <input type="radio" id="publisherrole" name="role" value="publisher" checked={radioCheck==="publisher"}  onChange={OnChange} onBlur={onBlur}/>
        <p>Bootcamp Publisher</p>
        <p className="is-danger">{error.message_checked}</p>
     </div>     
         <div className="validationError">
             <p>* You must be affiliated with the bootcamp in
                  some way in order to add it to DevCamper.</p>
         </div>   
     <div>
       <button className="regButton" type="button" onClick={SendDataToBackend} >Register</button>
     </div>
  </div>
</div>

        </>
    )
}

export default Register;