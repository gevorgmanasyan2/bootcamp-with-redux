import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();

// console.log("initial state ", store.getState());

// const unsubscribe=store.subscribe(()=>
// console.log("State after dispatch", store.getState())
// )
// store.dispatch({type:'todos/todoAdded',payload:'Learn about actions'});
// store.dispatch({type:'todos/todoAdded',payload:'Learn about redusers'});
// store.dispatch({type:'todos/todoAdded',payload:'Learn about stores'});

// store.dispatch({type:'todos/todoToggled',payload:0})
// store.dispatch({type:'todos/todoToggled',payload:1});

// store.dispatch({type:"filters/statusFilterChanged",payload:'Active'});

// store.dispatch({
//   type:'filters/colorFilterChanged',
//   payload:{color:'red',changeType:'added'}
// });


// unsubscribe()

