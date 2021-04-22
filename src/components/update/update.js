import React, {useState,useContext, useEffect} from 'react';
import './update.css';
import {useSelector,useDispatch} from 'react-redux';
import {update,updatePassword} from '../../actions/auth';





const Update=(props)=>{
    const dispatch=useDispatch();
    const error=useSelector(state=>state.message);
    const data=useSelector(state=>state.auth);
    
    console.log();
    const[values,setValues]=useState({currentPassword:"",newPassword:"",confirmNewPassword:""});
   
    const OnChange=(e)=>{
        switch (e.target.name) {
            case "currentPassword":
                setValues({...values, currentPassword:e.target.value})
                break;
            case "newPassword":
                setValues({...values, newPassword:e.target.value})
                break;
            case "confirmNewPassword":
                setValues({...values, confirmNewPassword:e.target.value})
                break;        
            default:
                break;
        }
    }
    const OnBlur=(e)=>{
        switch (e.target.name) {
            case "currentPassword":
                dispatch({type:'SET_MESSAGE_OLDPASSWORD',payload:e.target.value})
                break;
            case "newPassword":
                dispatch({type:'SET_MESSAGE_PASSWORD',payload:e.target.value})
                break;
            case "confirmNewPassword":
                dispatch({type:'SET_MESSAGE_CONFIRM',payload:e.target.value})
                break;        
            default:
                break;
        }
    }
   

    const SendDataToBackend=()=>{
        for (const key in error) {      
            if(error[key]!==""){
                   return
            }
            

    }     
            const {currentPassword,newPassword} = values
            // const update=updatePassword(values)
            dispatch(update(currentPassword,newPassword))
            .then(()=>{
                props.history.push('../home')
            })  
    }
    return(
        <>
       
       <div className="update">
          <div className="updateForm">
             <h1 className="updateHeader">Update Password</h1>
             <div className="updateItem">
                 <label className="updateLabel">Current Password</label><br/>
                 <input className="updateInp" type="password" name="currentPassword" placeholder="Current Password"
                 onChange={OnChange} onBlur={OnBlur} value={values.currentPassword || ''} required autoComplete="off" />
                <p className="is-danger">{error.message_oldpassword}</p>
             </div>
             <div className="updateItem">
                 <label className="updateLabel">New Password</label><br/>
                 <input className="updateInp" type="password" name="newPassword" placeholder="New Password"
                 onChange={OnChange} onBlur={OnBlur} value={values.newPassword || ''} required autoComplete="off" />
                 <p className="is-danger">{error.message_password}</p>
             </div>
             <div className="updateItem">
                 <label className="updateLabel">Confirm New Password</label><br/>
                 <input className="updateInp" type="password" name="confirmNewPassword" placeholder="Confirm New Password"
                 onChange={OnChange} onBlur={OnBlur} value={values.confirmNewPassword || ''} required autoComplete="off" />
                 <p className="is-danger">{error.message_confirm}</p>
             </div>
             <div className="updateBtn">
                 <button className="updateBtnInp" type="button"
                 onClick={SendDataToBackend} >Update Password</button>
             </div>
          </div>
       </div>

        </>
    )
}


export default Update;