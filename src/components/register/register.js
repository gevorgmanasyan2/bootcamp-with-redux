import React, {useState,useContext, useReducer} from 'react';
import regIcon from '../../public/images/regIcon.png';
import './register.css';
import {useSelector,useDispatch} from 'react-redux';
import {register} from '../../actions/auth';
import validate from '../validation';
// import useForm from './useForm';
// import UserInputContext from './userInputContext';
// import validate from './loginFormValidationRules';
// import axios from 'axios';



const Register=(props)=>{

  const dispatch=useDispatch();
const data=useSelector(state=>state)
const error=useSelector(state=>state.message)
let err;
if(error!==""){
  err={...error}
}
console.log(err);
const[values,setValues]=useState({name:"",email:"",password:"",confirm:"",role:""});
const[successful,setSuccessful]=useState(false);
const[errforLocalUse,setErrforLocalUse]=useState(error||null);
const[name,setName]=useState("");
const[email,setEmail]=useState('')



//    const rout="register";   
//    const {values,errors,handleChange,handleSubmit} = useForm(login, validate, rout);    
    //   function login() {
    //     console.log('No errors, submit callback called!');        
    //   } 
     
    // const InputStateReducer=useContext(UserInputContext);        
    // const [state,dispatch]=useReducer(InputStateReducer.reducer,InputStateReducer.initialstate);
    
    const OnChange=(e)=>{        
      switch (e.target.name) {
        case "name":
            setValues({...values, name:e.target.value})
            setErrforLocalUse([{...errforLocalUse,name:validate(e.target.value)}])            
            break;
        case "email":
            setValues({...values, email:e.target.value})
            setErrforLocalUse({...errforLocalUse,email:validate(e.target.value)})           
            break;
        case "password":
            setValues({...values, password:e.target.value})
            setErrforLocalUse([{...errforLocalUse,password:validate(e.target.value)}])
            break;   
            case "confirm":
              setValues({...values, confirm:e.target.value})
              setErrforLocalUse([{...errforLocalUse,confirm:validate(e.target.value)}])
              break;   
              case "role":
                setValues({...values, role:e.target.value})
                setErrforLocalUse([{...errforLocalUse,role:validate(e.target.value)}])
                break;        
        default:
            break;
    }   
   
    // setErrforLocalUse(error)      
    }   
    console.log("data", data); 
    console.log("error", error);
    console.log(successful);
    console.log("errforLocalUse", errforLocalUse);
    console.log("name", name);
    console.log("email", email);
 const SendData=(e)=>{
  dispatch({type:'SET_MESSAGE',payload:validate(values)})
    // handleSubmit()                         
   }

   const SendDataToBackend=()=>{

    dispatch(register(values.name,values.email,values.password,values.role))
     .then(() => {
      setSuccessful(true);
    })
    .catch(() => {
      setSuccessful(false);
    });
    //   let objState={};            
    //   for (const i in state) {           
    //      if(state[i]!=="" && Object.keys(errors).length===0){
    //           switch (i) {
    //              case "name":
    //                 objState[i]=state[i];
    //                 break;
    //              case "email":
    //                 objState[i]=state[i];
    //                 break;
    //              case "password":
    //                 objState[i]=state[i];
    //                 break;
    //              case "role":
    //                 objState[i]=state[i];
    //                 break;  
    //              default:
    //                 break;
    //           }       
    //      }     
    // }      
//     console.log(objState);
//    axios.post(`https://devcamp-api-node.herokuapp.com/api/v1/auth/register`,objState, {
//         headers:{
//            'Content-Type': 'application/json',
           
//     }})
//             .then(res => {               
//                 localStorage.setItem('userToken',res.data.token);                 
//                 props.history.push('./login');               
//               }).catch(err => {
//                 console.log(err, "< ERR")               
//               })   
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
        <input type="text" name="name" placeholder="Enter Full Name" onChange={OnChange}   required autoComplete="off" />
        {/* {errforLocalUse && (<p className="is-danger">{errforLocalUse[0].name}</p>)} */}
     </div>
     <div className="regInputs">
     <label>Email Address</label><br/>
        <input type="email" name="email" placeholder="Enter Email" onChange={OnChange}  required autoComplete="off" />
        {/* {errforLocalUse && (<p className="is-danger">{errforLocalUse[0].email}</p>)} */}
        {/* <p>{error.message.email}</p> */}
     </div>
     <div className="regInputs">
     <label>Password</label><br/>
        <input type="password" name="password" placeholder="Enter Password" onChange={OnChange}  required autoComplete="off" />
        {/* {(error.message.password!=undefined)?(<p className="is-danger">{error.message.password}</p>):""} */}
     </div>
     <div className="regInputs">
     <label>Confirm Password</label><br/>
        <input type="password" name="confirm" placeholder="Confirm Password" onChange={OnChange}  required autoComplete="off" />
        {/* {(error.message.confirm!=undefined)?(<p className="is-danger">{error.message.confirm}</p>):""} */}
     </div>
     <div className="regRadio">
        <label>User Role</label><br/>
        <input type="radio" name="role" value="user"  onChange={OnChange}/>
        <p>Regular User (Browse, Write reviews, etc)</p>
        <br/>
        <input type="radio" name="role" value="publisher"  onChange={OnChange}/>
        <p>Bootcamp Publisher</p>
     </div>     
         <div className="validationError">
             <p>* You must be affiliated with the bootcamp in
                  some way in order to add it to DevCamper.</p>
         </div>   
     <div>
       <button className="regButton" type="button" onClick={SendDataToBackend} onClickCapture={SendData}>Register</button>
     </div>
  </div>
</div>

        </>
    )
}

export default Register;