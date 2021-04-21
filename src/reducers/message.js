import { SET_MESSAGE, CLEAR_MESSAGE, SET_MESSAGE_NAME, SET_MESSAGE_EMAIL, SET_MESSAGE_PASSWORD, SET_MESSAGE_OLDPASSWORD, SET_MESSAGE_CONFIRM, SET_MESSAGE_CHECKED } from "../actions/types";


const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE: 
    return {message:payload}
    
    case SET_MESSAGE_NAME: 
    if(payload===""){
      return {...state,message_name:'the field must be fiiled'}
    }
    if(payload!==""){
      return {...state,message_name:''}
    }    
    else{
      return state
    }  

    case SET_MESSAGE_EMAIL: 
    if(payload===""){
      return {...state,message_email:'the field must be fiiled'}
    } if(!/\S+@\S+\.\S+/.test(payload)){
      return {...state,message_email:'Email address is invalid'}
    }
    if(payload!==""){
      return {...state,message_email:''}
    } if(/\S+@\S+\.\S+/.test(payload)){
      return {...state,message_email:''}
    }    
    else{
      return state
    }         
      
    case SET_MESSAGE_PASSWORD: 
    if(payload===""){
      return {...state,message_password:'Password is required'}
    } if(payload.length<6){
      return {...state,message_password:'Password must be 6 or more characters',initial_pass:payload}
    }    
    if(payload!==""){
      return {...state,message_password:'',initial_pass:payload}
    } if(payload.length>=6){
      return {...state,message_password:''}
    }    
    else{
      return state
    }
    case SET_MESSAGE_OLDPASSWORD: 
    if(payload===""){
      return {...state,message_oldpassword:'Password is required'}
    } if(payload.length<6){
      return {...state,message_oldpassword:'Password must be 6 or more characters'}
    }    
    if(payload!==""){
      return {...state,message_oldpassword:''}
    } if(payload.length>=6){
      return {...state,message_oldpassword:''}
    }    
    else{
      return state
    }    

    case SET_MESSAGE_CONFIRM: 
    if(payload===""){
      return {...state,message_confirm:'Password confirm is required'}
    } if(payload!==state.initial_pass){
      console.log(payload);
      console.log(state.message_password);
      return {...state,message_confirm:'password and confirm fields must be the same'}
    }
     if(payload===state.initial_pass){
      return {...state,message_confirm:'',initial_pass:''}
    }
    if(payload!==""){
      return {...state,message_confirm:''}
    }   
    else{
      return state
    } 

    case CLEAR_MESSAGE:
      return{
        state:''
      }
    

    default:
      return state;
  }
}